package com.example.ssbu_league.service;

import com.example.ssbu_league.models.AppUser;
import com.example.ssbu_league.models.Fights;
import com.example.ssbu_league.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RatingService {
    private static final int BASE_K_FACTOR = 32;
    private static final int DEFAULT_RATING = 1500;

    private final AppUserRepository appUserRepository;

    @Transactional
    public void updateRatings(Fights fight) {
        AppUser player1 = fight.getPlayer1();
        AppUser player2 = fight.getPlayer2();

        // Initialize scores if they're null
        Integer score1 = player1.getScore();
        Integer score2 = player2.getScore();
        player1.setScore((score1 == null || score1 == 0) ? DEFAULT_RATING : score1);
        player2.setScore((score2 == null || score2 == 0) ? DEFAULT_RATING : score2);

        // Calculate actual score (1 for win, 0.5 for draw, 0 for loss)
        double actualScore1 = calculateActualScore(fight.getGameCountPlayer1(), fight.getGameCountPlayer2());
        double actualScore2 = 1.0 - actualScore1;

        // Calculate expected scores
        double expectedScore1 = calculateExpectedScore(player1.getScore(), player2.getScore());
        double expectedScore2 = 1.0 - expectedScore1;

        
        // Calculate dynamic K-factors based on rating difference
        double k1 = calculateDynamicKFactor(player1.getScore(), player2.getScore(), actualScore1);
        double k2 = calculateDynamicKFactor(player2.getScore(), player1.getScore(), actualScore2);

        // Update ratings with protection for large rating differences
        int newRating1 = (int) Math.round(player1.getScore() + k1 * (actualScore1 - expectedScore1));
        int newRating2 = (int) Math.round(player2.getScore() + k2 * (actualScore2 - expectedScore2));

        // Ensure minimum rating of 1
        newRating1 = Math.max(1, newRating1);
        newRating2 = Math.max(1, newRating2);

        // Save new ratings
        player1.setScore(newRating1);
        player2.setScore(newRating2);
        appUserRepository.save(player1);
        appUserRepository.save(player2);
    }

    private double calculateDynamicKFactor(int playerRating, int opponentRating, double actualScore) {
        int ratingDiff = Math.abs(playerRating - opponentRating);
        
        // If player is lower rated
        if (playerRating < opponentRating) {
            // Winning against higher rated player = more points
            if (actualScore > 0.5) {
                return BASE_K_FACTOR * (1.0 + (ratingDiff / 800.0));
            }
            // Losing against higher rated player = fewer points lost
            else {
                return BASE_K_FACTOR * Math.max(0.1, 1.0 - (ratingDiff / 800.0));
            }
        }
        // If player is higher rated
        else {
            // Winning against lower rated player = fewer points
            if (actualScore > 0.5) {
                return BASE_K_FACTOR * Math.max(0.1, 1.0 - (ratingDiff / 800.0));
            }
            // Losing against lower rated player = more points lost
            else {
                return BASE_K_FACTOR * (1.0 + (ratingDiff / 800.0));
            }
        }
    }

    private double calculateExpectedScore(Integer rating1, Integer rating2) {
        return 1.0 / (1.0 + Math.pow(10.0, (rating2 - rating1) / 400.0));
    }

    private double calculateActualScore(int player1Games, int player2Games) {
        if (player1Games > player2Games) return 1.0;
        if (player1Games < player2Games) return 0.0;
        return 0.5;
    }

    public double predictWinProbability(AppUser player1, AppUser player2) {
        Integer score1 = player1.getScore();
        Integer score2 = player2.getScore();
        if (score1 == null || score2 == null || score1 == 0 || score2 == 0) {
            return 0.5; // Equal chances if either player has no rating
        }
        return calculateExpectedScore(player1.getScore(), player2.getScore());
    }
}
