package com.example.ssbu_league.dto;

import com.example.ssbu_league.models.GameMode;
import lombok.Data;

@Data
public class FightDTO {
    private String player1GamerTag;
    private String player2GamerTag;
    private GameMode mode;
    private int gameCountPlayer1;
    private int gameCountPlayer2;
}
