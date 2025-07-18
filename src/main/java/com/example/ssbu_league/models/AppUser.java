package com.example.ssbu_league.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Column(unique = true)
    private String gamerTag;

    private LocalDateTime createdAt;

    private int score;

    @Enumerated(EnumType.STRING)
    private Role role;
    
    @ElementCollection
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "user_main_characters", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "character")
    private List<Character> mainCharacters = new ArrayList<>();

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

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getGamerTag() {
        return gamerTag;
    }

    public void setGamerTag(String gamerTag) {
        this.gamerTag = gamerTag;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
    
    public List<Character> getMainCharacters() {
        return mainCharacters;
    }
    
    public void setMainCharacters(List<Character> mainCharacters) {
        if (mainCharacters.size() <= 3) {
            this.mainCharacters = mainCharacters;
        } else {
            this.mainCharacters = mainCharacters.subList(0, 3);
        }
    }
    
    public void addMainCharacter(Character character) {
        if (mainCharacters.size() < 3 && !mainCharacters.contains(character)) {
            mainCharacters.add(character);
        }
    }
    
    public void removeMainCharacter(Character character) {
        mainCharacters.remove(character);
    }
}