package com.artbazar.artbazarbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class ArtbazarBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ArtbazarBackendApplication.class, args);
    }

}
