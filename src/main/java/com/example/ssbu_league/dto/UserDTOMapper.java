package com.example.ssbu_league.dto;

import com.example.ssbu_league.models.AppUser;
import org.springframework.stereotype.Component;

@Component
public class UserDTOMapper {

    public UserScoreDTO toUserScoreDTO(AppUser appUser) {
        return new UserScoreDTO(
                appUser.gamerTag(),
                appUser.score()
                // TODO Update accordingly to UserToDTOMapper
        );
    }

    /* I decided to ditch the UserDTO for the moment being to simplify user data changes by just using the actual
     * AppUser objects in transfer

    public AppUserDTO toAppUserDTO(AppUser appUser) {
        return new AppUserDTO(
                appUser.getUsername(),
                appUser.getPassword(),
                appUser.getGamerTag(),
                appUser.getRole()
        );
    } */
}
