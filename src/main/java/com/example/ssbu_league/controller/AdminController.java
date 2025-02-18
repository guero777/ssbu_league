package com.example.ssbu_league.controller;

import com.example.ssbu_league.models.AppUser;
import com.example.ssbu_league.repositories.AppUserRepository;
import com.example.ssbu_league.services.AppUserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AdminController {

    private final AppUserRepository appUserRepository;
    private final AppUserService appUserService;

    public AdminController(AppUserRepository appUserRepository, AppUserService appUserService) {
        this.appUserRepository = appUserRepository;
        this.appUserService = appUserService;
    }

    @GetMapping("/admin")
    public String admin() {
        return "admin";
    }


    @RequestMapping("/promoteToAdmin")
    public String promoteToAdmin(@RequestParam String username) {
        AppUser currentUser = appUserRepository.findByUsername(username);
        appUserService.changeUserRole(username);
        return "admin";
    }

}
