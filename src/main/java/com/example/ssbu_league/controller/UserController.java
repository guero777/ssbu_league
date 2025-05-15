package com.example.ssbu_league.controller;


import com.example.ssbu_league.dto.RegistrationRequest;
import com.example.ssbu_league.dto.UserDTOMapper;
import com.example.ssbu_league.dto.UserScoreDTO;
import com.example.ssbu_league.models.AppUser;
import com.example.ssbu_league.services.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Vite's default port
public class UserController {

    @Autowired
    private AppUserService appUserService;


    @DeleteMapping("/delete-user/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable String username) {
        try {
            appUserService.deleteByUsername(username);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting user: " + e.getMessage());
        }
    }


    @GetMapping("get-user-table")
    public List<AppUser> getUserTable() {
        return appUserService.getAllUsers();
    }

    /*  returns a list of all UserScoreDTO
    *   look for UserScoreDTO    */
    @GetMapping("/userRankings")
    public List<UserScoreDTO> getAllUserScores() {

        UserDTOMapper mapper = new UserDTOMapper();

        return appUserService.getAllUsers()
                .stream()
                .map(mapper::toUserScoreDTO)
                .collect(Collectors.toList());
    }

    /*  returns the role from the currently logged-in user */
    @GetMapping("/getRole")
    public String getCurrentUserRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return appUserService.getRole(username);
    }


    // TODO IMPLEMENT REGISTER ENDPOINT
    @GetMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationRequest request) {
        return null;
    }

    /*@PostMapping("/register")
    public String register(@RequestParam String username,
                           @RequestParam String password,
                           @RequestParam String passwordConfirm,
                           Model model) {
        // Delegate validation and user creation to the service
        String validationError = appUserService.validateAndCreateUser(username, password, passwordConfirm);

        if (validationError != null) {
            // If validation fails, returns an error message and shows the form again
            model.addAttribute("error", validationError);
            model.addAttribute("user", new AppUser()); // Add empty user to the form
            return "register";
        }

        // If user creation is successful, redirects to a homepage
        return "redirect:/";
    }*/


    /*@GetMapping("/profile")
    public String profile(Model model, AppUserPrincipal principal) {
        if (principal != null) {
            String username = principal.getUsername();
            AppUser currentUser = appUserRepository.findByUsername(username);
            model.addAttribute("user", currentUser);
        }
        return "profile";
    }*/

    /*@GetMapping("/user/users")
    public String users(Model model) {
        model.addAttribute("users", appUserService.getAllUserScores());
        return "users";
    }*/

}
