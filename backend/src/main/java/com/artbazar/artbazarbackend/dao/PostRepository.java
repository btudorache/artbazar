package com.artbazar.artbazarbackend.dao;

import com.artbazar.artbazarbackend.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
