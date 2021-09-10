package com.artbazar.artbazarbackend.service;

import com.artbazar.artbazarbackend.entity.Image;
import com.artbazar.artbazarbackend.entity.Profile;
import com.artbazar.artbazarbackend.entity.User;
import com.artbazar.artbazarbackend.entity.data.UserDetail;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    void deleteUser(Long id);

    User getUserByName(String username);

    User getUserByEmail(String email);

    UserDetail getUserDetailByUsername(String username);

    Image getUserProfileImage(Long id);

    User saveUser(User newUser);

    User updateUser(User updatedUser);
}
