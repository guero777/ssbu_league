package com.example.ssbu_league.dto;

import com.example.ssbu_league.models.AppUser;
import org.springframework.stereotype.Component;

@Component
public class UserDTOMapper {

    public UserScoreDTO toUserScoreDTO(AppUser appUser) {
        UserScoreDTO userScoreDTO = new UserScoreDTO();
        userScoreDTO.setGamerTag(appUser.getGamerTag());
        userScoreDTO.setScore(appUser.getScore());
        userScoreDTO.setMainCharacters(appUser.getMainCharacters());
        return userScoreDTO;
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
