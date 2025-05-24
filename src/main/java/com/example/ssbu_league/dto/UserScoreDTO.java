package com.example.ssbu_league.dto;

import com.example.ssbu_league.models.Character;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class UserScoreDTO implements Serializable {

    private String gamerTag;
    private int score;
    private List<Character> mainCharacters;

    public UserScoreDTO() {
        // Default constructor needed for serialization
        this.mainCharacters = new ArrayList<>();
    }

    public UserScoreDTO(String gamerTag, int score, List<Character> mainCharacters) {
        this.gamerTag = gamerTag;
        this.score = score;
        this.mainCharacters = mainCharacters != null ? mainCharacters : new ArrayList<>();
    }

    public String getGamerTag() {
        return gamerTag;
    }

    public void setGamerTag(String gamerTag) {
        this.gamerTag = gamerTag;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public List<Character> getMainCharacters() {
        return mainCharacters;
    }

    public void setMainCharacters(List<Character> mainCharacters) {
        this.mainCharacters = mainCharacters;
    }

    public String getFirstMainShorthand() {
        if (mainCharacters != null && !mainCharacters.isEmpty()) {
            return mainCharacters.get(0).getShortName();
        }
        return "";
    }
}
