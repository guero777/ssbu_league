package com.example.ssbu_league.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DotenvConfig {
    
    @Bean
    public Dotenv dotenv() {
        try {
            return Dotenv.configure()
                .directory(".")     // Current directory
                .ignoreIfMissing()  // Don't fail if .env is missing
                .load();
        } catch (Exception e) {
            // Return a no-op implementation if .env file is not found
            return Dotenv.configure().ignoreIfMissing().load();
        }
    }
}
