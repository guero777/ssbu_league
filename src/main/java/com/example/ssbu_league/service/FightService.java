package com.example.ssbu_league.service;

import com.example.ssbu_league.dto.FightDTO;
import com.example.ssbu_league.models.AppUser;
import com.example.ssbu_league.models.Fights;
import com.example.ssbu_league.models.GameMode;
import com.example.ssbu_league.repository.FightRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FightService {

    private final FightRepository fightRepository;
    private final RatingService ratingService;

    private void validateFight(AppUser player1, AppUser player2, FightDTO fightDTO) {
        // Validate players
        if (player1 == null || player2 == null) {
            throw new IllegalArgumentException("Both players must exist");
        }
        if (player1.equals(player2)) {
            throw new IllegalArgumentException("Players cannot fight themselves");
        }
        if (player1.getGamerTag() == null || player2.getGamerTag() == null) {
            throw new IllegalArgumentException("Both players must have gamertags");
        }

        // Validate scores
        int player1Games = fightDTO.getGameCountPlayer1();
        int player2Games = fightDTO.getGameCountPlayer2();
        int maxWins = fightDTO.getMode() == GameMode.BEST_OF_3 ? 2 : 3;
        int maxGames = fightDTO.getMode() == GameMode.BEST_OF_3 ? 3 : 5;
        int totalGames = player1Games + player2Games;

        if (player1Games < 0 || player2Games < 0) {
            throw new IllegalArgumentException("Game counts cannot be negative");
        }
        
        if (player1Games > maxWins) {
            throw new IllegalArgumentException("Player 1 cannot have more than " + maxWins + " wins in " + fightDTO.getMode());
        }
        if (player2Games > maxWins) {
            throw new IllegalArgumentException("Player 2 cannot have more than " + maxWins + " wins in " + fightDTO.getMode());
        }
        
        if (totalGames > maxGames) {
            throw new IllegalArgumentException("Total games cannot exceed " + maxGames + " for " + fightDTO.getMode());
        }

        // Validate at least one player has enough wins for a valid match
        boolean isValidMatch = player1Games >= maxWins || player2Games >= maxWins;
        if (totalGames > 0 && !isValidMatch) {
            throw new IllegalArgumentException("Match is incomplete - no player has reached the required number of wins");
        }
    }

    public Fights createFight(AppUser player1, AppUser player2, FightDTO fightDTO) {
        validateFight(player1, player2, fightDTO);
        
        // Create new fight
        Fights newFight = new Fights();
        newFight.setPlayer1(player1);
        newFight.setPlayer2(player2);
        newFight.setMode(fightDTO.getMode());
        newFight.setGameCountPlayer1(fightDTO.getGameCountPlayer1());
        newFight.setGameCountPlayer2(fightDTO.getGameCountPlayer2());
        
        // Save fight first
        fightRepository.save(newFight);
        
        // Then update ratings
        ratingService.updateRatings(newFight);
        
        return newFight;
    }

    public List<Fights> findFightsByGamerTag(String gamerTag) {
        if (gamerTag == null || gamerTag.trim().isEmpty()) {
            throw new IllegalArgumentException("Gamertag cannot be empty");
        }
        return fightRepository.findByPlayerGamerTag(gamerTag);
    }
}
