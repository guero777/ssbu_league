package com.example.ssbu_league.dto;

import lombok.AllArgsConstructor;
import lombok.Value;

@AllArgsConstructor
@Value
public class UserScoreDTO {
    String gamerTag;
    int score;
}
