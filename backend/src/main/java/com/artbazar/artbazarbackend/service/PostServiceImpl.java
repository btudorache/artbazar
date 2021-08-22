package com.artbazar.artbazarbackend.service;

import com.artbazar.artbazarbackend.dao.PostRepository;
import com.artbazar.artbazarbackend.dao.UserRepository;
import com.artbazar.artbazarbackend.entity.Post;
import com.artbazar.artbazarbackend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PostServiceImpl implements PostService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Autowired
    public PostServiceImpl(UserRepository userRepository, PostRepository postRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    @Override
    public List<Post> getAll() {
        return postRepository.findAll(Sort.by("createdAt").descending());
    }

    @Override
    public Post addPost(String username, Post newPost) {
        User user = userRepository.findByUsername(username);
        newPost.setUser(user);
        return postRepository.save(newPost);
    }
}
