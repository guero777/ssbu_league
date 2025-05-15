package com.example.ssbu_league.models;

import jakarta.persistence.*;
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

    @Id
    @GeneratedValue
    private int id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String gamerTag;

    private LocalDateTime createdAt;

    private int score;

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

    // Logic for spring security auth
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    public void switchRole() {
        if (role == Role.ADMIN) role = Role.USER;
        else role = Role.ADMIN;
    }

    public int id() {
        return id;
    }


    public String username() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String password() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String gamerTag() {
        return gamerTag;
    }

    public void setGamerTag(String gamerTag) {
        this.gamerTag = gamerTag;
    }

    public LocalDateTime createdAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public int score() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public Role role() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
