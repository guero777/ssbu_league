package com.example.ssbu_league.repositories;

import com.example.ssbu_league.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Integer> {
    // Custom queries
    // TODO check if these custom queries even work? I just copied them months ago
    public AppUser findByUsername(String username);
    public boolean existsByUsername(String username);

}
