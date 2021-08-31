package com.artbazar.artbazarbackend.service;

import com.artbazar.artbazarbackend.entity.Comment;

import java.util.List;

public interface CommentService {

    List<Comment> getComments();

    Comment addComment(String text, Long postId);
}
