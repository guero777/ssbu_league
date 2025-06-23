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

    private void validateScores(FightDTO fightDTO) {
        int player1Games = fightDTO.getGameCountPlayer1();
        int player2Games = fightDTO.getGameCountPlayer2();
        int maxWins = fightDTO.getMode() == GameMode.BEST_OF_3 ? 2 : 3;
        
        if (player1Games > maxWins) {
            throw new IllegalArgumentException("Player 1 cannot have more than " + maxWins + " wins in " + fightDTO.getMode());
        }
        if (player2Games > maxWins) {
            throw new IllegalArgumentException("Player 2 cannot have more than " + maxWins + " wins in " + fightDTO.getMode());
        }
        
        int totalGames = player1Games + player2Games;
        if (totalGames > (fightDTO.getMode() == GameMode.BEST_OF_3 ? 3 : 5)) {
            throw new IllegalArgumentException("Total games cannot exceed the maximum allowed for " + fightDTO.getMode());
        }
    }

    public Fights createFight(AppUser player1, AppUser player2, FightDTO fightDTO) {
        validateScores(fightDTO);
        Fights fight = new Fights();
        fight.setPlayer1(player1);
        fight.setPlayer2(player2);
        fight.setMode(fightDTO.getMode());
        fight.setGameCountPlayer1(fightDTO.getGameCountPlayer1());
        fight.setGameCountPlayer2(fightDTO.getGameCountPlayer2());
        
        return fightRepository.save(fight);
    }

    public List<Fights> findFightsByUsername(String username) {
        return fightRepository.findByPlayer1UsernameOrPlayer2Username(username, username);
    }
}
