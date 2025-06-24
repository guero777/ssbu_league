package com.example.ssbu_league.controller;

import com.example.ssbu_league.dto.FightDTO;
import com.example.ssbu_league.dto.FightResponseDTO;
import com.example.ssbu_league.models.AppUser;
import com.example.ssbu_league.models.Fights;
import com.example.ssbu_league.service.FightService;
import com.example.ssbu_league.service.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fights")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:8080", 
    "http://173.212.222.16", "http://173.212.222.16:8080",
    "https://173.212.222.16", "https://173.212.222.16:8080"}, 
    allowCredentials = "true") // Allow both local and VPS
public class FightController {

    private final FightService fightService;
    private final AppUserService userService;

    @PostMapping
    public ResponseEntity<?> addFight(@RequestBody FightDTO fightDTO) {
        try {
            AppUser player1 = userService.findUserByGamerTag(fightDTO.getPlayer1GamerTag());
            AppUser player2 = userService.findUserByGamerTag(fightDTO.getPlayer2GamerTag());

            Fights fight = fightService.createFight(player1, player2, fightDTO);
            return ResponseEntity.ok(FightResponseDTO.fromFight(fight));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user")
    public ResponseEntity<List<FightResponseDTO>> getUserFights(@AuthenticationPrincipal UserDetails userDetails) {
        String gamerTag = userService.getGamerTag(userDetails.getUsername());
        List<Fights> fights = fightService.findFightsByGamerTag(gamerTag);
        List<FightResponseDTO> dtos = fights.stream()
            .map(FightResponseDTO::fromFight)
            .toList();
        return ResponseEntity.ok(dtos);
    }


}
