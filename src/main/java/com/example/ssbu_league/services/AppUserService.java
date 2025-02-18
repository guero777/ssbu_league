package com.example.ssbu_league.services;

import com.example.ssbu_league.configurations.AppUserPrincipal;
import com.example.ssbu_league.models.AppUser;
import com.example.ssbu_league.repositories.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service
public class AppUserService implements UserDetailsService {

    @Autowired
    private AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AppUserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    public void createUser(String username, String password) {
        String encodedPassword = passwordEncoder.encode(password);
        AppUser newUser = new AppUser(username, encodedPassword);
        appUserRepository.save(newUser);
    }

    public boolean changeUserRole(String username) {
        // Retrieve the user by their username
        AppUser user = appUserRepository.findByUsername(username);

        if (user != null) {
            // Change the user's role to ADMIN
            user.switchRole();
            // Save the updated user back into the database
            appUserRepository.save(user);
            return true; // Successfully changed the role
        }
        return false; // User not found
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findByUsername(username);
        if (appUser == null) {
            throw new UsernameNotFoundException(username);
        }
        return new AppUserPrincipal(appUser);
    }
}
