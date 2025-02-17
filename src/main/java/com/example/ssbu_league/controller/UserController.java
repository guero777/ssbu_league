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
    private AppUserService appUserService;

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
    public String register(@RequestParam String username, @RequestParam String password) {
        appUserService.createUser(username, password);
        return "redirect:/";
    }

    @GetMapping("/users")
    public String users(Model model) {
        model.addAttribute("users", appUserRepository.findAll());
        return "users";
    }

}
