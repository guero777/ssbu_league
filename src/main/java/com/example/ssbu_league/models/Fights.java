package com.example.ssbu_league.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Fights {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private AppUser player1;

    @ManyToOne(optional = false)
    private AppUser player2;

    @Enumerated(EnumType.STRING)
    private GameMode mode;

    private int gameCountPlayer1;

    private int gameCountPlayer2;

    private LocalDateTime timestamp;

    // TODO add constructor
    public Fights() {
        timestamp = LocalDateTime.now();
    }

}

