package com.example.ssbu_league.service;

import com.example.ssbu_league.config.AppUserPrincipal;
import com.example.ssbu_league.dto.UserEditDTO;
import com.example.ssbu_league.models.AppUser;
import com.example.ssbu_league.models.Character;
import com.example.ssbu_league.repository.AppUserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import com.example.ssbu_league.dto.UserDTO;
import org.springframework.transaction.annotation.Transactional;


@Service
public class AppUserService implements UserDetailsService {

    @Autowired
    private AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AppUserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    public List<String> getAllUsernames() {
        return appUserRepository.findAll().stream()
                .map(AppUser::getUsername)
                .collect(Collectors.toList());
    }

    // UserDetailService implementation requires returning a Principal for login and session purpose
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        return new AppUserPrincipal(appUser);
    }

    public String validateAndCreateUser(String username, String password) {
        // Check if username is already taken
        if (appUserRepository.existsByUsername(username)) {
            return "Username already exists! Please choose another one.";
        }

        // Check if password is too short
        if (password.length() < 4) {
            return "Password must be at least 4 characters!";
        }

        // All validations passed, save the new user
        createUser(username, password);
        return null;  // Indicate that everything is fine
    }

    // Create user with AppUser(username, encodedPassword) constructor
    private void createUser(String username, String password) {
        String encodedPassword = passwordEncoder.encode(password);
        AppUser newUser = new AppUser(username, encodedPassword);
        appUserRepository.save(newUser);
    }


    // Delete user by username and return error message if user not found
    public String deleteByUsername(String username) {
        return appUserRepository.findByUsername(username)
            .map(user -> {
                appUserRepository.delete(user);
                return (String)null; // Indicate success
            })
            .orElse("User not found"); // Return error message
    }

    // Delete user by id
    public void deleteUserById(int id) {
        appUserRepository.deleteById(id);
    }

    public String getRole(String username) {
        return appUserRepository.findByUsername(username)
            .map(user -> user.getRole().name())
            .orElseGet(() -> {
                System.out.println("User not found for username: " + username);
                return null;
            });
    }

    // Check if the user is an admin
    public boolean isAdmin(AppUser appUser) {
        return appUser.getRole() == AppUser.Role.ADMIN;
    }

    // Toggles Admin/User role
    public void changeUserRole(String username) {
        appUserRepository.findByUsername(username)
            .ifPresent(user -> {
                user.switchRole();
                appUserRepository.save(user);
            });
    }

    /**
     * Get all users from the database
     * @return List of UserDTO objects
     */
    @Transactional(readOnly = true)
    public List<UserDTO> getAllUsers() {
        return appUserRepository.findAll().stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }

    public void updateUser(UserEditDTO userEditDTO) {
        AppUser user = appUserRepository.findByUsername(userEditDTO.getOriginalUsername())
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + userEditDTO.getOriginalUsername()));

        // Update username if provided
        if (userEditDTO.getNewUsername() != null && !userEditDTO.getNewUsername().isEmpty()) {
            user.setUsername(userEditDTO.getNewUsername());
        }
        
        // Update password if provided
        if (userEditDTO.getNewPassword() != null && !userEditDTO.getNewPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userEditDTO.getNewPassword()));
        }
        
        // Update role if provided
        if (userEditDTO.getNewRole() != null && !userEditDTO.getNewRole().isEmpty()) {
            user.setRole(AppUser.Role.valueOf(userEditDTO.getNewRole()));
        }
        
        // Update gamerTag if provided
        if (userEditDTO.getNewGamerTag() != null) {
            user.setGamerTag(userEditDTO.getNewGamerTag());
        }
        
        appUserRepository.save(user);
    }
    
    // Get user's gamertag by username
    public String getGamerTag(String username) {
        return appUserRepository.findByUsername(username)
            .map(AppUser::getGamerTag)
            .orElse(null);
    }
    
    // Update user's gamertag
    public void updateUsername(String currentUsername, String newUsername) {
        if (appUserRepository.findByUsername(newUsername).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        
        AppUser user = appUserRepository.findByUsername(currentUsername)
            .orElseThrow(() -> new RuntimeException("Current user not found"));
        
        user.setUsername(newUsername);
        appUserRepository.save(user);
    }

    public void updateGamerTag(String username, String gamerTag) {
        appUserRepository.findByUsername(username)
            .ifPresent(user -> {
                user.setGamerTag(gamerTag);
                appUserRepository.save(user);
            });
    }
    
    // Get user's main characters by username
    @Transactional(readOnly = true)
    public List<Character> getMainCharacters(String username) {
        return appUserRepository.findByUsername(username)
            .map(AppUser::getMainCharacters)
            .orElse(new ArrayList<>());
    }
    
    // Update user's main characters
    public void updateMainCharacters(String username, List<Character> characters) {
        appUserRepository.findByUsername(username)
            .ifPresent(user -> {
                user.setMainCharacters(characters);
                appUserRepository.save(user);
            });
    }

    public AppUser findUserByGamerTag(String gamerTag) {
        return appUserRepository.findByGamerTag(gamerTag)
            .orElseThrow(() -> new RuntimeException("User not found with gamerTag: " + gamerTag));
    }

    public List<String> getAllGamerTagsExcept(String currentGamerTag) {
        List<AppUser> users;
        if (currentGamerTag == null || currentGamerTag.isEmpty()) {
            System.out.println("Current gamertag is null/empty, getting all non-null gamertags");
            users = appUserRepository.findByGamerTagIsNotNull();
        } else {
            System.out.println("Getting all gamertags except: " + currentGamerTag);
            users = appUserRepository.findByGamerTagNotAndGamerTagIsNotNull(currentGamerTag);
        }
        System.out.println("Found users: " + users);
        
        List<String> gamertags = users.stream()
            .map(AppUser::getGamerTag)
            .collect(Collectors.toList());
        System.out.println("Extracted gamertags: " + gamertags);
        return gamertags;
    }

    public void updateUser(AppUser user) {
        appUserRepository.save(user);
    }
}
