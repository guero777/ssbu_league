package com.example.ssbu_league.repository;

import com.example.ssbu_league.models.Fights;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FightRepository extends JpaRepository<Fights, Long> {
    List<Fights> findByPlayer1UsernameOrPlayer2Username(String player1Username, String player2Username);
}
