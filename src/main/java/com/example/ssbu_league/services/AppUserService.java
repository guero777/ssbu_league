package com.example.ssbu_league.services;

import com.example.ssbu_league.configurations.AppUserPrincipal;
import com.example.ssbu_league.models.AppUser;
import com.example.ssbu_league.models.Character;
import com.example.ssbu_league.repositories.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class AppUserService implements UserDetailsService {

    @Autowired
    private AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AppUserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    // UserDetailService implementation requires returning a Principal for login and session purpose
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findByUsername(username);
        if (appUser == null) {
            throw new UsernameNotFoundException(username);
        }
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
        AppUser user = appUserRepository.findByUsername(username);
        if (user != null) {
            appUserRepository.delete(user);
            return null; // Indicate success
        }
        return "User not found"; // Return error message
    }

    // Delete user by id
    public void deleteUserById(int id) {
        appUserRepository.deleteById(id);
    }

    public String getRole(String username) {
        AppUser user = appUserRepository.findByUsername(username);
        return user.role().name();
    }

    // Check if the user is an admin
    public boolean isAdmin(AppUser appUser) {
        return appUser.role() == AppUser.Role.ADMIN;
    }

    // Toggles Admin/User role
    public void changeUserRole(String username) {
        // Retrieve the user by their username
        AppUser user = appUserRepository.findByUsername(username);
        if (user != null) {
            // Change the user's role to ADMIN
            user.switchRole();
            // Save the updated user back into the database
            appUserRepository.save(user);
        }
    }

    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll(); // Fetch all users
    }
    
    // Get user's gamertag by username
    public String getGamerTag(String username) {
        AppUser user = appUserRepository.findByUsername(username);
        if (user != null) {
            return user.gamerTag();
        }
        return null;
    }
    
    // Update user's gamertag
    public void updateGamerTag(String username, String gamerTag) {
        AppUser user = appUserRepository.findByUsername(username);
        if (user != null) {
            user.setGamerTag(gamerTag);
            appUserRepository.save(user);
        }
    }
    
    // Get user's main characters by username
    public List<Character> getMainCharacters(String username) {
        AppUser user = appUserRepository.findByUsername(username);
        if (user != null) {
            return user.getMainCharacters();
        }
        return new ArrayList<>();
    }
    
    // Update user's main characters
    public void updateMainCharacters(String username, List<Character> characters) {
        AppUser user = appUserRepository.findByUsername(username);
        if (user != null) {
            user.setMainCharacters(characters);
            appUserRepository.save(user);
        }
    }
}
