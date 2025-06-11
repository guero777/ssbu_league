package com.example.ssbu_league.dto;

import com.example.ssbu_league.models.AppUser;
import com.example.ssbu_league.models.Character;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

public class UserDTO {
    private int id;
    private String username;
    private String gamerTag;
    private LocalDateTime createdAt;
    private int score;
    private String role;
    private List<Character> mainCharacters;

    public UserDTO(AppUser user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.gamerTag = user.getGamerTag();
        this.createdAt = user.getCreatedAt();
        this.score = user.getScore();
        this.role = user.getRole().name();
        // Create a new ArrayList to eagerly fetch the data
        this.mainCharacters = new ArrayList<>(user.getMainCharacters());
    }
        
    // Getters
    public int getId() { return id; }
    public String getUsername() { return username; }
    public String getGamerTag() { return gamerTag; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public int getScore() { return score; }
    public String getRole() { return role; }
    public List<Character> getMainCharacters() { return mainCharacters; }
}
