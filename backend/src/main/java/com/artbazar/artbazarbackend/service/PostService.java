package com.artbazar.artbazarbackend.service;

import com.artbazar.artbazarbackend.entity.Post;

import java.util.List;

public interface PostService {
    List<Post> getAll();

    Post addPost(String username, Post newPost);
}
