package com.artbazar.artbazarbackend.controller;

import com.artbazar.artbazarbackend.aspect.annotation.LogExecutionTime;
import com.artbazar.artbazarbackend.service.FollowerService;
import com.artbazar.artbazarbackend.utils.ApiResponse;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/followers")
public class FollowerController {

    private final FollowerService followerService;

    @Autowired
    public FollowerController(FollowerService followerService) {
        this.followerService = followerService;
    }

    @LogExecutionTime
    @PostMapping("/follow/{followedUsername}")
    public ResponseEntity<ApiResponse> followUser(Authentication authentication, @PathVariable String followedUsername) {
        try{
            String followingUsername = authentication.getName();
            boolean followedSuccessfully = followerService.followUser(followingUsername, followedUsername);

            if (followedSuccessfully) {
                return ResponseEntity.ok(new ApiResponse("User Followed Successfully", 200));
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiResponse("Couldn't follow user", 403));
            }
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiResponse("Follow entity already exists", 403));
        }
    }

    @LogExecutionTime
    @DeleteMapping("/unfollow/{followedUsername}")
    public ResponseEntity<ApiResponse> unfollowUser(Authentication authentication, @PathVariable String followedUsername) {
        String followingUsername = authentication.getName();
        boolean unfollowedSuccessfully = followerService.unfollowUser(followingUsername, followedUsername);

        if (unfollowedSuccessfully) {
            return ResponseEntity.ok(new ApiResponse("User Unfollowed Successfully", 200));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiResponse("Couldn't unfollow user", 403));
        }
    }
}
