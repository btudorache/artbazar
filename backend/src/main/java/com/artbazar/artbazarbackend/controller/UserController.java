package com.artbazar.artbazarbackend.controller;

import com.artbazar.artbazarbackend.entity.User;
import com.artbazar.artbazarbackend.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@Slf4j
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users/{userId}")
    public User getUser(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/users")
    public ResponseEntity<String> addUser(@RequestBody User newUser) throws JsonProcessingException {
        try {
            User savedUser = userService.saveUser(newUser);
            Map<String, String> output = new HashMap<>();
            output.put("message", "User saved successfully");
            String outputBody = new ObjectMapper().writeValueAsString(output);
            return new ResponseEntity<String>(outputBody, HttpStatus.OK);
        } catch (Exception e) {
            // TODO: handle most of the exception cases correctly!
            Map<String, String> error = new HashMap<>();
            error.put("error", "Username already used!");
            log.error(e.getMessage());
            String outputBody = new ObjectMapper().writeValueAsString(error);
            return new ResponseEntity<String>(outputBody, HttpStatus.FORBIDDEN);
        }
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User updatedUser) {
        return userService.updateUser(updatedUser);
    }

    @DeleteMapping("/users/{userId}")
    public void deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
    }
}
