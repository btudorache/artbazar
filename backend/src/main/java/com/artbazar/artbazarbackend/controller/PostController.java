package com.artbazar.artbazarbackend.controller;

import com.artbazar.artbazarbackend.entity.Post;
import com.artbazar.artbazarbackend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/posts")
    public List<Post> getAllPosts() {
        return postService.getAll();
    };

    @PostMapping("/posts")
    public Post addPost(Authentication authentication, @RequestBody Post newPost) {
        String username = authentication.getName();
        return postService.addPost(username, newPost);
    }
}
