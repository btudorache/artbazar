package com.artbazar.artbazarbackend.dao;

import com.artbazar.artbazarbackend.entity.Follower;
import com.artbazar.artbazarbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowerRepository extends JpaRepository<Follower, Long> {
    Follower findByFollowingUserAndFollowedUser(User FollowingUser, User FollowedUser);
}
