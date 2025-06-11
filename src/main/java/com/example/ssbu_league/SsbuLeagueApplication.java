package com.example.ssbu_league;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class SsbuLeagueApplication {

	public static void main(String[] args) {
		SpringApplication.run(SsbuLeagueApplication.class, args);
	}
}
