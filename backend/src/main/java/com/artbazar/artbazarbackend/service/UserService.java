package com.artbazar.artbazarbackend.service;

import com.artbazar.artbazarbackend.entity.Image;
import com.artbazar.artbazarbackend.entity.User;
import com.artbazar.artbazarbackend.data.ProfileData;
import com.artbazar.artbazarbackend.data.UserData;
import com.artbazar.artbazarbackend.data.UserDetail;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {

    List<UserData> getAllUsers();

    void deleteUser(Long id);

    User getUserByName(String username);

    User getUserByEmail(String email);

    UserDetail getUserDetailByUsername(String requesterUsername, String targetUsername);

    Image getUserProfileImage(Long id);

    User saveUser(User newUser);

    ProfileData editProfile(String username, String name, String location, String description, MultipartFile image) throws IOException;
}
