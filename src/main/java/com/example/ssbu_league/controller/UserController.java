package com.example.ssbu_league.controller;


import com.example.ssbu_league.configurations.AppUserPrincipal;
import com.example.ssbu_league.models.AppUser;
import com.example.ssbu_league.repositories.AppUserRepository;
import com.example.ssbu_league.services.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class UserController {

    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    private AppUserService appUserService;

    /*@PostMapping("/login")
    public String login(@RequestParam String username,
                        @RequestParam String password,
                        Model model) {
        return "redirect:/profile";
    }*/

    /*@GetMapping("/register")
    public String register(Model model) {
        AppUser newUser = new AppUser();
        model.addAttribute("user", newUser);
        return "register";    }
    */

    /*@PostMapping("/register")
    public String register(@RequestParam String username,
                           @RequestParam String password,
                           @RequestParam String passwordConfirm,
                           Model model) {
        // Delegate validation and user creation to the service
        String validationError = appUserService.validateAndCreateUser(username, password, passwordConfirm);

        if (validationError != null) {
            // If validation fails, return error message and show the form again
            model.addAttribute("error", validationError);
            model.addAttribute("user", new AppUser()); // Add empty user to the form
            return "register";
        }

        // If user creation is successful, redirect to home page
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
        model.addAttribute("users", appUserService.getAllUsers());
        return "users";
    }*/

}
