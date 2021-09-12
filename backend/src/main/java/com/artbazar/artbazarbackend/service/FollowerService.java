package com.artbazar.artbazarbackend.service;

public interface FollowerService {
    boolean followExists(String followingUserUsername, String followedUserUsername);

    boolean followUser(String followingUserUsername, String followedUserUsername);

    boolean unfollowUser(String followingUserUsername, String followedUserUsername);
}
