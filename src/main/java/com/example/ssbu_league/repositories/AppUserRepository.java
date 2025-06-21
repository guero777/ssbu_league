package com.example.ssbu_league.repositories;

import com.example.ssbu_league.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Integer> {
    // Custom queries
    public Optional<AppUser> findByUsername(String username);
    public boolean existsByUsername(String username);
}
