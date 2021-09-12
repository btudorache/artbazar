package com.artbazar.artbazarbackend.service;

import com.artbazar.artbazarbackend.dao.FollowerRepository;
import com.artbazar.artbazarbackend.dao.UserRepository;
import com.artbazar.artbazarbackend.entity.Follower;
import com.artbazar.artbazarbackend.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class FollowerServiceImpl implements FollowerService {

    private final UserRepository userRepository;
    private final FollowerRepository followerRepository;

    public FollowerServiceImpl(UserRepository userRepository, FollowerRepository followerRepository) {
        this.userRepository = userRepository;
        this.followerRepository = followerRepository;
    }

    @Override
    public boolean followExists(String followingUserUsername, String followedUserUsername) {
        User followingUser = userRepository.findByUsername(followingUserUsername);
        User followedUser = userRepository.findByUsername(followedUserUsername);
        if (followingUser == null || followedUser == null) {
            return false;
        }

        Follower follower = followerRepository.findByFollowingUserAndFollowedUser(followingUser, followedUser);
        return follower != null;
    }

    @Override
    public boolean followUser(String followingUserUsername, String followedUserUsername) {
        User followingUser = userRepository.findByUsername(followingUserUsername);
        User followedUser = userRepository.findByUsername(followedUserUsername);
        if (followingUser == null || followedUser == null) {
            return false;
        }

        followerRepository.save(new Follower(followingUser, followedUser));
        return true;
    }

    @Override
    public boolean unfollowUser(String followingUserUsername, String followedUserUsername) {
        User followingUser = userRepository.findByUsername(followingUserUsername);
        User followedUser = userRepository.findByUsername(followedUserUsername);
        if (followingUser == null || followedUser == null) {
            return false;
        }

        Follower follower = followerRepository.findByFollowingUserAndFollowedUser(followingUser, followedUser);
        if (follower == null) {
            return false;
        }

        followerRepository.delete(follower);
        return true;
    }
}
