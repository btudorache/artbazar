package com.artbazar.artbazarbackend.service;

import com.artbazar.artbazarbackend.data.*;
import com.artbazar.artbazarbackend.entity.Image;
import com.artbazar.artbazarbackend.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {

    List<UserPreview> getAllUserData();

    List<UserPreview> searchUser(String username);

    void deleteUser(Long id);

    User getUserByName(String username);

    User getUserByEmail(String email);

    UserDetail getUserDetailByUsername(String requesterUsername, String targetUsername);

    ImageData getUserProfileImageData(Long id);

    User saveUser(User newUser);

    ProfileData editProfile(String username, String name, String location, String description, MultipartFile image) throws IOException;
}
