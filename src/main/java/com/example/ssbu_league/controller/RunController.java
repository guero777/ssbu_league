package com.example.ssbu_league.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RunController {

    @GetMapping("/")
    public String index() {
        return "forward:/index.html";
    }
}
