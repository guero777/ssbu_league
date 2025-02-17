package com.example.ssbu_league.controller;


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
    private final AppUserService appUserService;

    @Autowired
    public UserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping("/register")
    public String register(Model model) {
        AppUser newUser = new AppUser();
        model.addAttribute("user", newUser);
        return "register";
    }


    @PostMapping("/register")
    public String register(@RequestParam String username,
                           @RequestParam String password,
                           @RequestParam String passwordConfirm,
                           Model model) {
        // Assert username is not null and unique
        if (appUserRepository.existsByUsername(username)) {
            model.addAttribute("error", "Username already exists! Please choose another one.");
            AppUser newUser = new AppUser();
            model.addAttribute("user", newUser);
            return "register";
        }
        // Assert password is at least 6 chars long
        else if (password.length() < 6) {
            model.addAttribute("error", "Password must be at least 6 characters!");
            AppUser newUser = new AppUser();
            model.addAttribute("user", newUser);
            return "register";
        }
        // Assert both passwords are equal
         else if (!password.equals(passwordConfirm)) {
            model.addAttribute("error", "Passwords do not match!");
            AppUser newUser = new AppUser();
            model.addAttribute("user", newUser);
            return "register";
        }
        // All tests passed, save user to database
        appUserService.createUser(username, password);
        return "redirect:/";
    }

    @GetMapping("/users")
    public String users(Model model) {
        model.addAttribute("users", appUserRepository.findAll());
        return "users";
    }

}
