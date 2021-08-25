package com.artbazar.artbazarbackend.service;

import com.artbazar.artbazarbackend.entity.Post;
import com.artbazar.artbazarbackend.entity.data.PostData;

import java.util.List;

public interface PostService {
    List<PostData> getAll();

    PostData addPost(String username, Post newPost);
}
