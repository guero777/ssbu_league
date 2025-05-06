package com.example.ssbu_league.dto;

import com.example.ssbu_league.models.AppUser;
import org.springframework.stereotype.Component;

@Component
public class UserToDTOMapper {

    public UserScoreDTO toDTO(AppUser appUser) {
        return new UserScoreDTO(
                appUser.getGamerTag()
                // TODO Update accordingly to UserToDTOMapper
        );
    }

}
