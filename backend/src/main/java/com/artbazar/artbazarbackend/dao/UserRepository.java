package com.artbazar.artbazarbackend.dao;

import com.artbazar.artbazarbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    User findByEmail(String email);
}
