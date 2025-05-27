package com.example.ssbu_league.controller;

import com.example.ssbu_league.dto.UserRegistrationDTO;
import com.example.ssbu_league.dto.UserDTOMapper;
import com.example.ssbu_league.dto.UserScoreDTO;
import com.example.ssbu_league.dto.UserEditDTO;
import com.example.ssbu_league.models.AppUser;
import com.example.ssbu_league.models.Character;
import com.example.ssbu_league.services.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://173.212.222.16:8080"}) // Allow both local and VPS
public class UserController {

    @Autowired
    private AppUserService appUserService;

    @PutMapping("/admin/edit-user")
    public ResponseEntity<?> editUser(@RequestBody UserEditDTO userEditDTO) {
        try {
            // Only check for username conflict if username is being changed
            if (!userEditDTO.getNewUsername().equals(userEditDTO.getOriginalUsername()) &&
                appUserService.loadUserByUsername(userEditDTO.getNewUsername()) != null) {
                return ResponseEntity.badRequest().body("Username already exists");
            }

            appUserService.updateUser(userEditDTO);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error editing user: " + e.getMessage());
        }
    }

    @DeleteMapping("/admin/delete-user/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable String username) {
        try {
            appUserService.deleteByUsername(username);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting user: " + e.getMessage());
        }
    }

    @GetMapping("/admin/get-user-table")
    public List<AppUser> getUserTable() {
        return appUserService.getAllUsers();
    }

    @GetMapping("/userRankings")
    public List<UserScoreDTO> getAllUserScores() {
        UserDTOMapper mapper = new UserDTOMapper();
        return appUserService.getAllUsers()
                .stream()
                .map(mapper::toUserScoreDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/user/get-info")
    public ResponseEntity<?> getCurrentUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication.getName().equals("anonymousUser")) {
            return ResponseEntity.status(401).body("Not authenticated");
        }
        String username = authentication.getName();
        String role = appUserService.getRole(username);
        if (role == null) {
            return ResponseEntity.status(404).body("User not found");
        }
        return ResponseEntity.ok().body(Map.of(
            "username", username,
            "role", role
        ));
    }

    @GetMapping("/user/get-role")
    public ResponseEntity<?> getCurrentUserRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication.getName().equals("anonymousUser")) {
            return ResponseEntity.status(401).body("Not authenticated");
        }
        String username = authentication.getName();
        String role = appUserService.getRole(username);
        if (role == null) {
            return ResponseEntity.status(404).body("User not found");
        }
        return ResponseEntity.ok(role);
    }

    @PutMapping("/user/edit-username")
    public ResponseEntity<?> updateUsername(@RequestParam String newUsername) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Not authenticated");
        }
        
        String currentUsername = authentication.getName();
        try {
            appUserService.updateUsername(currentUsername, newUsername);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user/current-user")
    public ResponseEntity<String> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && !authentication.getName().equals("anonymousUser")) {
            return ResponseEntity.ok(authentication.getName());
        }
        return ResponseEntity.status(401).body("Not authenticated");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegistrationDTO request) {
        try {
            String validationError = appUserService.validateAndCreateUser(
                request.getUsername(),
                request.getPassword()
            );

            if (validationError != null) {
                return ResponseEntity.badRequest().body(validationError);
            }

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error registering user: " + e.getMessage());
        }
    }

    @GetMapping("/user/current-gamertag")
    public ResponseEntity<?> getCurrentGamerTag() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && !authentication.getName().equals("anonymousUser")) {
            String username = authentication.getName();
            String gamerTag = appUserService.getGamerTag(username);
            return ResponseEntity.ok(gamerTag);
        }
        return ResponseEntity.status(401).body("Not authenticated");
    }

    @PostMapping("/user/edit-gamertag")
    public ResponseEntity<?> editGamerTag(@RequestBody Map<String, String> request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && !authentication.getName().equals("anonymousUser")) {
            String username = authentication.getName();
            String newGamerTag = request.get("gamerTag");
            
            if (newGamerTag == null || newGamerTag.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Gamertag cannot be empty");
            }
            
            try {
                appUserService.updateGamerTag(username, newGamerTag);
                return ResponseEntity.ok().build();
            } catch (Exception e) {
                return ResponseEntity.badRequest().body("Error updating gamertag: " + e.getMessage());
            }
        }
        return ResponseEntity.status(401).body("Not authenticated");
    }
    
    // Character-related endpoints
    @GetMapping("/characters")
    public List<Map<String, String>> getAllCharacters() {
        return Arrays.stream(Character.values())
                .sorted((c1, c2) -> c1.getFullName().compareTo(c2.getFullName()))
                .map(character -> {
                    Map<String, String> characterMap = new HashMap<>();
                    characterMap.put("name", character.name());
                    characterMap.put("fullName", character.getFullName());
                    characterMap.put("shortName", character.getShortName());
                    return characterMap;
                })
                .collect(Collectors.toList());
    }
    
    @GetMapping("/user/main-characters")
    public ResponseEntity<?> getUserMainCharacters() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && !authentication.getName().equals("anonymousUser")) {
            String username = authentication.getName();
            List<Character> mainCharacters = appUserService.getMainCharacters(username);
            
            List<Map<String, String>> result = mainCharacters.stream()
                    .map(character -> {
                        Map<String, String> characterMap = new HashMap<>();
                        characterMap.put("name", character.name());
                        characterMap.put("fullName", character.getFullName());
                        characterMap.put("shortName", character.getShortName());
                        return characterMap;
                    })
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.status(401).body("Not authenticated");
    }
    
    @PostMapping("/user/update-main-characters")
    public ResponseEntity<?> updateMainCharacters(@RequestBody List<String> characterNames) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && !authentication.getName().equals("anonymousUser")) {
            String username = authentication.getName();
            
            try {
                List<Character> characters = characterNames.stream()
                        .map(name -> Character.valueOf(name))
                        .collect(Collectors.toList());
                
                appUserService.updateMainCharacters(username, characters);
                return ResponseEntity.ok().build();
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body("Invalid character name");
            } catch (Exception e) {
                return ResponseEntity.badRequest().body("Error updating main characters: " + e.getMessage());
            }
        }
        return ResponseEntity.status(401).body("Not authenticated");
    }
}