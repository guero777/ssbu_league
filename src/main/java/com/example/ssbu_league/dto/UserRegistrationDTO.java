package com.example.ssbu_league.dto;

import com.example.ssbu_league.models.AppUser.Role;

public class UserRegistrationDTO {
    
    private String username;
    private String password;
    private Role role;
    
    public UserRegistrationDTO() {
        role = Role.USER;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
