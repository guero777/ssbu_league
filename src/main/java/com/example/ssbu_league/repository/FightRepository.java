package com.example.ssbu_league.repository;

import com.example.ssbu_league.models.Fights;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FightRepository extends JpaRepository<Fights, Long> {
    @Query("SELECT f FROM Fights f WHERE f.player1.gamerTag = :gamerTag OR f.player2.gamerTag = :gamerTag ORDER BY f.timestamp DESC")
    List<Fights> findByPlayerGamerTag(@Param("gamerTag") String gamerTag);
}
