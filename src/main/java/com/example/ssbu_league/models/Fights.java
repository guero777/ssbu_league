package com.example.ssbu_league.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
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

    // Initialize timestamp in constructor
    {
        timestamp = LocalDateTime.now();
    }
}

