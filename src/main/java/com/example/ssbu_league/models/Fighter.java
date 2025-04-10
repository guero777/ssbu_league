package com.example.ssbu_league.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
public class Fighter {

    @Id
    @Getter
    private int id;

    @Getter
    @Setter
    private String name;

}
