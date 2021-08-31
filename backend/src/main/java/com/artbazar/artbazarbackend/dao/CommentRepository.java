package com.artbazar.artbazarbackend.dao;

import com.artbazar.artbazarbackend.entity.Comment;
import com.artbazar.artbazarbackend.entity.Post;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post, Sort sort);
}
