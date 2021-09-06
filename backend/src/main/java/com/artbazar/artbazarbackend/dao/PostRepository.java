package com.artbazar.artbazarbackend.dao;

import com.artbazar.artbazarbackend.entity.Post;
import com.artbazar.artbazarbackend.entity.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUser(User user, Sort sort);
}
