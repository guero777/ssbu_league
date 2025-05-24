package com.example.ssbu_league;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SsbuLeagueApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(SsbuLeagueApplication.class);
		app.setAdditionalProfiles("dev");
		app.run(args);
	}
}
