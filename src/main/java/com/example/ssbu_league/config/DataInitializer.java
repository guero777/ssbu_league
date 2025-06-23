package com.example.ssbu_league.config;

import com.example.ssbu_league.models.AppUser;
import com.example.ssbu_league.repository.AppUserRepository;

import io.github.cdimascio.dotenv.Dotenv;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);
    
    @Autowired
    private AppUserRepository appUserRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private Dotenv dotenv;
    
    
    @Override
    public void run(String... args) {
        AppUser admin = appUserRepository.findByUsername("admin").orElse(null);
        if (admin == null || admin.getRole() != AppUser.Role.ADMIN) {
            String password = dotenv.get("ADMIN_PASSWORD");
            logger.info("Creating admin user with password: {}", password);
            admin = new AppUser("admin", passwordEncoder.encode(password));
            admin.setRole(AppUser.Role.ADMIN);
            appUserRepository.save(admin);
        }
    }

}
