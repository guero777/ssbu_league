package com.example.ssbu_league.controller;

import com.example.ssbu_league.models.AppUser;
import com.example.ssbu_league.repositories.AppUserRepository;
import com.example.ssbu_league.services.AppUserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class AdminController {

    private final AppUserRepository appUserRepository;
    private final AppUserService appUserService;

    public AdminController(AppUserRepository appUserRepository, AppUserService appUserService) {
        this.appUserRepository = appUserRepository;
        this.appUserService = appUserService;
    }


    @GetMapping("/admin")
    public String adminPage(Model model) {
        List<AppUser> users = appUserRepository.findAll();
        model.addAttribute("users", users);
        return "admin";
    }
    // Change the user's role when the checkbox is toggled
    @PostMapping("/admin/changeRole")
    public String changeUserRole(String username) {
        appUserService.changeUserRole(username); // Toggle the role
        return "redirect:/admin"; // Redirect back to the admin page after change
    }


    @RequestMapping("/promoteToAdmin")
    public String promoteToAdmin(@RequestParam String username) {
        AppUser currentUser = appUserRepository.findByUsername(username);
        appUserService.changeUserRole(username);
        return "admin";
    }

}
