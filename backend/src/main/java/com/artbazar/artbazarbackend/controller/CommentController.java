package com.artbazar.artbazarbackend.controller;

import com.artbazar.artbazarbackend.entity.Comment;
import com.artbazar.artbazarbackend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/comments")
    public List<Comment> getComments() {
        return commentService.getComments();
    }

    @PostMapping("/comments")
    public Comment addComment(Authentication authentication,
                              @RequestParam("text") String text,
                              @RequestParam("post_id") Long postId) {
        return commentService.addComment(text, authentication.getName(), postId);
    }
}
