package com.artbazar.artbazarbackend.service;

import com.artbazar.artbazarbackend.entity.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    void deleteUser(Long id);

    User getUserByName(String username);

    User getUserByEmail(String email);

    User getUserById(Long id);

    User saveUser(User newUser);

    User updateUser(User updatedUser);
}
