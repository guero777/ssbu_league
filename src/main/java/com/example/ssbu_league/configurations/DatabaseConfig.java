package com.example.ssbu_league.configurations;

import org.springframework.boot.autoconfigure.jdbc.JdbcConnectionDetails;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class DatabaseConfig {

    @Bean
    @Primary
    public JdbcConnectionDetails jdbcConnectionDetails() {
        return new JdbcConnectionDetails() {
            @Override
            public String getUsername() {
                return "dev_user";
            }

            @Override
            public String getPassword() {
                return "dev_password";
            }

            @Override
            public String getJdbcUrl() {
                return "jdbc:postgresql://localhost:5432/smash_scoreboard";
            }

            @Override
            public String getDriverClassName() {
                return "org.postgresql.Driver";
            }
        };
    }
}