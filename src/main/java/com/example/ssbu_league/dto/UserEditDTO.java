package com.example.ssbu_league.dto;

public class UserEditDTO {
    private String originalUsername;
    private String newUsername;
    private String newPassword;
    private String newRole;
    private String newGamerTag;

    public UserEditDTO() {
    }

    public String getOriginalUsername() {
        return originalUsername;
    }

    public void setOriginalUsername(String originalUsername) {
        this.originalUsername = originalUsername;
    }

    public String getNewUsername() {
        return newUsername;
    }

    public void setNewUsername(String newUsername) {
        this.newUsername = newUsername;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getNewRole() {
        return newRole;
    }

    public void setNewRole(String newRole) {
        this.newRole = newRole;
    }

    public String getNewGamerTag() {
        return newGamerTag;
    }

    public void setNewGamerTag(String newGamerTag) {
        this.newGamerTag = newGamerTag;
    }
    
}
