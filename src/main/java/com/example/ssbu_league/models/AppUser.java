package com.example.ssbu_league.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
public class AppUser {

    public enum Role {
        USER, ADMIN
    }

    @Getter
    @Id
    @GeneratedValue
    private int id;

    @Getter
    @Setter
    @Column(unique = true, nullable = false)
    private String username;

    @Getter
    @Setter
    @Column(nullable = false)
    private String password;

    @Getter
    @Setter
    private String gamerTag;
    private LocalDateTime createdAt;

    @Getter
    @Enumerated(EnumType.STRING)
    private Role role;

    public AppUser() {
    }

    public AppUser(String username, String password) {
        this.username = username;
        this.password = password;
        this.role = Role.USER;
        this.createdAt = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", gamerTag='" + gamerTag + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    public void switchRole() {
        if (role == Role.ADMIN) {
            role = Role.USER;
        }
        else {
            role = Role.ADMIN;
        }
    }
}
