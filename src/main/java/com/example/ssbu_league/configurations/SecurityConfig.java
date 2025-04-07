package com.example.ssbu_league.configurations;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()) // React can access CSRF token from cookies
                ).authorizeHttpRequests(auth -> auth
                        .requestMatchers( "/index.html")
                        .permitAll()
                        .requestMatchers("/login", "/register", "/logout", "/error")
                        .permitAll()
                        .requestMatchers("/api/**")
                        .authenticated() // secure only API calls
                        .anyRequest()
                        .permitAll()) // allow all other frontend routes

                .formLogin(form -> form.loginProcessingUrl("/login") // where React posts to
                        .usernameParameter("username")
                        .passwordParameter("password").defaultSuccessUrl("/", true) // or your custom dashboard
                        .permitAll()
                        .loginPage("/login"))
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/")
                        .deleteCookies("JSESSIONID")
                        .permitAll())
                .cors(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}