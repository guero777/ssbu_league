package com.example.ssbu_league.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DotenvConfig {
    
    @Bean
    public Dotenv dotenv() {
        return Dotenv.configure()
            .directory("/app")  // Docker container path
            .directory(".")     // Current directory
            .ignoreIfMissing()  // Don't fail if .env is missing
            .load();
    }
}
