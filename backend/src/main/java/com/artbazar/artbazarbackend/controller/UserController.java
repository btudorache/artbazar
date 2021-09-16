package com.artbazar.artbazarbackend.controller;

import com.artbazar.artbazarbackend.data.*;
import com.artbazar.artbazarbackend.entity.Image;
import com.artbazar.artbazarbackend.entity.User;
import com.artbazar.artbazarbackend.data.enums.UserType;
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

    @GetMapping("/{targetUsername}")
    public ResponseEntity<Object> getUserDetail(Authentication authentication, @PathVariable String targetUsername) {
        String requesterUsername = authentication.getName();
        UserDetail userDetail = userService.getUserDetailByUsername(requesterUsername, targetUsername);

        if (userDetail == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse("User not found", HttpStatus.NOT_FOUND.value()));
        }

        return ResponseEntity.ok(userDetail);
    }

    @GetMapping("")
    public List<UserData> getAllUsers() {
        return userService.getAllUserData();
    }

    @GetMapping("/search")
    public List<UserPreview> searchUsers(@RequestParam("username") String username) {
        log.info(username);
        return userService.searchUser(username);
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
    public ResponseEntity<Object> editProfile(Authentication authentication,
                                                       @RequestParam("name") String name,
                                                       @RequestParam("location") String location,
                                                       @RequestParam("description") String description,
                                                       @RequestParam(name = "image", required = false) MultipartFile image) {

        try {
            String username = authentication.getName();
            ProfileData newProfile = userService.editProfile(username, name, location, description, image);
            return ResponseEntity.ok(newProfile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(String.format("Could not upload the file: %s!", image.getOriginalFilename()), HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
    }

    @GetMapping("/images/{id}")
    public ResponseEntity<byte[]> getUserImage(@PathVariable Long id) {
        ImageData imageData = userService.getUserProfileImageData(id);

        if (imageData == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + imageData.getImageName() + "\"")
                .contentType(MediaType.valueOf(imageData.getContentType()))
                .body(imageData.getImage());
    }
}
