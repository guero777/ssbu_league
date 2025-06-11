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

    public UserScoreDTO toUserScoreDTO(UserDTO userDTO) {
        UserScoreDTO userScoreDTO = new UserScoreDTO();
        
        userScoreDTO.setGamerTag(userDTO.getGamerTag());
        userScoreDTO.setScore(userDTO.getScore());
        userScoreDTO.setMainCharacters(userDTO.getMainCharacters());
        
        return userScoreDTO;
    }


    public UserEditDTO toUserEditDTO(AppUser appUser) {
        
        UserEditDTO userEditDTO = new UserEditDTO();
        
        userEditDTO.setOriginalUsername(appUser.getUsername());
        userEditDTO.setNewUsername(appUser.getUsername());
        userEditDTO.setNewPassword(appUser.getPassword());
        userEditDTO.setNewRole(appUser.getRole().name());
        userEditDTO.setNewGamerTag(appUser.getGamerTag());

        return userEditDTO;
    }
}
