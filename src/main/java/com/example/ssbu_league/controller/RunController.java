package com.example.ssbu_league.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RunController {

    @RequestMapping(value = {"/","/login", "/register", "/user/dashboard", "/user/profile", "/admin/panel"})    
    public String index() {
        return "forward:/index.html";
    }
}
