package com.example.ssbu_league.configurations;

import com.example.ssbu_league.models.AppUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class AppUserPrincipal implements UserDetails {

    private final AppUser appUser;

    public AppUserPrincipal(AppUser appUser) {
        this.appUser = appUser;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return appUser.getAuthorities();
    }

    @Override
    public String getPassword() {
        return appUser.password();
    }

    @Override
    public String getUsername() {
        return appUser.username();
    }
}
