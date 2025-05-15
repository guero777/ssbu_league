package com.example.ssbu_league.dto;

public class UserScoreDTO {

    String gamerTag;
    int score;

    public UserScoreDTO(String gamerTag, int score) {
        this.gamerTag = gamerTag;
        this.score = score;
    }
}
