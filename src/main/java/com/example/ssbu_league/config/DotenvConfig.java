package com.example.ssbu_league.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DotenvConfig {
    
    @Bean
    public Dotenv dotenv() {
        // Only load .env file in non-production environments
        if (!"prod".equals(System.getenv("SPRING_PROFILES_ACTIVE"))) {
            return Dotenv.configure().load();
        }
        // In production, return a no-op implementation that delegates to System.getenv
        return Dotenv.configure().ignoreIfMissing().load();
    }
}
