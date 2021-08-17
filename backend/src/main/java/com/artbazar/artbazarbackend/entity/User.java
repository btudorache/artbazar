package com.artbazar.artbazarbackend.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="users")
public class User {

    public User(String username, String password, String type, String email) {
        this.username = username;
        this.password = password;
        this.type = type;
        this.email = email;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Long id;

    @Column(name="username", unique=true)
    private String username;

    @Column(name="password")
    private String password;

    @Column(name="type")
    private String type;

    @Column(name="email")
    private String email;
}
