package com.example.ssbu_league.dto;

import com.example.ssbu_league.models.Fights;
import com.example.ssbu_league.models.GameMode;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class FightResponseDTO {
    private Long id;
    private String player1GamerTag;
    private String player2GamerTag;
    private GameMode mode;
    private int gameCountPlayer1;
    private int gameCountPlayer2;
    private LocalDateTime timestamp;

    public static FightResponseDTO fromFight(Fights fight) {
        FightResponseDTO dto = new FightResponseDTO();
        dto.setId(fight.getId());
        dto.setPlayer1GamerTag(fight.getPlayer1().getGamerTag());
        dto.setPlayer2GamerTag(fight.getPlayer2().getGamerTag());
        dto.setMode(fight.getMode());
        dto.setGameCountPlayer1(fight.getGameCountPlayer1());
        dto.setGameCountPlayer2(fight.getGameCountPlayer2());
        dto.setTimestamp(fight.getTimestamp());
        return dto;
    }
}
