package com.example.ssbu_league.repository;

import com.example.ssbu_league.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Integer> {
    // Custom queries
    public Optional<AppUser> findByUsername(String username);
    public boolean existsByUsername(String username);
    public Optional<AppUser> findByGamerTag(String gamerTag);
    public List<AppUser> findByGamerTagNotAndGamerTagIsNotNull(String gamerTag);
    public List<AppUser> findByGamerTagIsNotNull();
}
