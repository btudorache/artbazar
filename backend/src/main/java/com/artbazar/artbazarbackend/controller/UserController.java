package com.artbazar.artbazarbackend.controller;

import com.artbazar.artbazarbackend.entity.Image;
import com.artbazar.artbazarbackend.entity.Profile;
import com.artbazar.artbazarbackend.entity.User;
import com.artbazar.artbazarbackend.entity.enums.UserType;
import com.artbazar.artbazarbackend.entity.data.UserDetail;
import com.artbazar.artbazarbackend.service.UserService;
import com.artbazar.artbazarbackend.utils.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@Slf4j
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{username}")
    public ResponseEntity<Object> getUserDetail(@PathVariable String username) {
        UserDetail userDetail = userService.getUserDetailByUsername(username);

        if (userDetail == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse("User not found", HttpStatus.NOT_FOUND.value()));
        }

        return ResponseEntity.ok(userDetail);
    }

    @GetMapping("")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse> addUser(@RequestBody User newUser) {
        try {
            if (newUser.getUsername() == null || newUser.getPassword() == null || newUser.getType() == null || newUser.getEmail() == null) {
                throw new IllegalArgumentException("Invalid input");
            }

            if (!(newUser.getType().equals(UserType.ARTIST.name()) || newUser.getType().equals(UserType.EXPLORER.name()))) {
                throw new IllegalArgumentException("Invalid user type");
            }

            User sameNameUser = userService.getUserByName(newUser.getUsername());
            if (sameNameUser != null) {
                throw new ConstraintViolationException("Username already used!", new SQLIntegrityConstraintViolationException(), "unique username constraint");
            }

            User sameEmailUser = userService.getUserByEmail(newUser.getEmail());
            if (sameEmailUser != null) {
                throw new ConstraintViolationException("Email already used!", new SQLIntegrityConstraintViolationException(), "unique email constraint");
            }

            userService.saveUser(newUser);

            return new ResponseEntity<>(new ApiResponse("User saved successfully", HttpStatus.OK.value()), HttpStatus.OK);
        } catch (ConstraintViolationException | IllegalArgumentException e) {
            return new ResponseEntity<>(new ApiResponse(e.getMessage(), HttpStatus.BAD_REQUEST.value()), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<Profile> editProfile(Authentication authentication,
                                            @RequestParam("name") String name,
                                            @RequestParam("location") String location,
                                            @RequestParam("description") String description) {

        String username = authentication.getName();

        User user = userService.getUserByName(username);
        Profile profile = user.getProfile();

        if (name != null && !name.trim().isEmpty()) {
            profile.setName(name);
        }
        if (location != null && !location.trim().isEmpty()) {
            profile.setLocation(location);
        }
        if (description != null && !description.trim().isEmpty()) {
            profile.setDescription(description);
        }

        Profile savedProfile = userService.updateUser(user).getProfile();
        savedProfile.setProfileImage(null);

        return ResponseEntity.ok(savedProfile);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
    }

    @GetMapping("/images/{id}")
    public ResponseEntity<byte[]> getUserImage(@PathVariable Long id) {
        Image image = userService.getUserProfileImage(id);

        if (image == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + image.getImageName() + "\"")
                .contentType(MediaType.valueOf(image.getContentType()))
                .body(image.getImage());
    }
}
