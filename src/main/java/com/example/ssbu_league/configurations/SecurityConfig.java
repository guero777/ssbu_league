package com.example.ssbu_league.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()) // ⬅️ CRUCIAL
                        .ignoringRequestMatchers("/login") // Add this line to ignore CSRF for login
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers( "/index")
                        .permitAll()
                        .requestMatchers("/login", "/register", "/logout", "/error")
                        .permitAll()
                        .requestMatchers("/api/**")
                        .authenticated() // secure only API calls
                        .anyRequest()
                        .permitAll() // allow all other frontend routes
                )

                .formLogin(form -> form
                        .loginProcessingUrl("/login") // where React posts to
                        .usernameParameter("username")
                        .passwordParameter("password")
                        //.defaultSuccessUrl("/index", true)
                        .permitAll()
                        .loginPage("/login")
                        )

                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/index")
                        .deleteCookies("JSESSIONID")
                        .permitAll()
                )

                .cors(cors -> cors
                        .configurationSource(request -> {
                            CorsConfiguration config = new CorsConfiguration();
                            config.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:5173"));
                            config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                            config.setAllowedHeaders(List.of("Content-Type", "X-XSRF-TOKEN", "X-Requested-With"));
                            config.setAllowCredentials(true);
                            return config;
                        })
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}