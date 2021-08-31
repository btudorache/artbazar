package com.artbazar.artbazarbackend.dao;

import com.artbazar.artbazarbackend.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
