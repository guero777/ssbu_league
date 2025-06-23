package com.example.ssbu_league.controller;

import com.example.ssbu_league.dto.FightDTO;
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
public class FightController {

    private final FightService fightService;
    private final AppUserService userService;

    @PostMapping
    public ResponseEntity<Fights> addFight(@AuthenticationPrincipal UserDetails userDetails, @RequestBody FightDTO fightDTO) {
        AppUser player1 = (AppUser) userService.loadUserByUsername(userDetails.getUsername());
        
        AppUser player2 = (AppUser) userService.loadUserByUsername(fightDTO.getPlayer2Username());

        Fights fight = fightService.createFight(player1, player2, fightDTO);
        return ResponseEntity.ok(fight);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Fights>> getUserFights(@AuthenticationPrincipal UserDetails userDetails) {
        List<Fights> fights = fightService.findFightsByUsername(userDetails.getUsername());
        return ResponseEntity.ok(fights);
    }

    @GetMapping("/users")
    public ResponseEntity<List<String>> getAllUsernames() {
        List<String> usernames = userService.getAllUsernames();
        return ResponseEntity.ok(usernames);
    }
}
