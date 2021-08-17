package com.artbazar.artbazarbackend.controller;

import com.artbazar.artbazarbackend.entity.User;
import com.artbazar.artbazarbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
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
    public User addUser(@RequestBody User newUser) {
        return userService.saveUser(newUser);
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
