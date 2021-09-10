package com.artbazar.artbazarbackend.service;

import com.artbazar.artbazarbackend.entity.Image;
import com.artbazar.artbazarbackend.entity.Profile;
import com.artbazar.artbazarbackend.entity.User;
import com.artbazar.artbazarbackend.entity.data.UserDetail;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    void deleteUser(Long id);

    User getUserByName(String username);

    User getUserByEmail(String email);

    UserDetail getUserDetailByUsername(String username);

    Image getUserProfileImage(Long id);

    User saveUser(User newUser);

    Profile editProfileWithoutImage(String username, String name, String location, String description);

    Profile editProfileWithImage(String username, String name, String location, String description, MultipartFile image) throws IOException;
}
