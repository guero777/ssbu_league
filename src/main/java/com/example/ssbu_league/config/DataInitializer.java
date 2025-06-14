package com.example.ssbu_league.config;

import com.example.ssbu_league.models.AppUser;
import com.example.ssbu_league.repositories.AppUserRepository;
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
        // Check if admin user exists, if not create one
        if (!appUserRepository.existsByUsername("admin")) {
            String adminPassword = dotenv.get("ADMIN_PASSWORD");
            if (adminPassword == null || adminPassword.isEmpty()) {
                logger.error("ADMIN_PASSWORD not found in .env file");
                return;
            }
            
            logger.info("Creating admin user");
            AppUser adminUser = new AppUser("admin", passwordEncoder.encode(adminPassword));
            adminUser.setRole(AppUser.Role.ADMIN);
            appUserRepository.save(adminUser);
            logger.info("Admin user created successfully");
        } else {
            logger.info("Admin user already exists");
        }
    }
}
