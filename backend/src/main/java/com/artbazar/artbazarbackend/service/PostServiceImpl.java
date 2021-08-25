package com.artbazar.artbazarbackend.service;

import com.artbazar.artbazarbackend.dao.PostRepository;
import com.artbazar.artbazarbackend.dao.UserRepository;
import com.artbazar.artbazarbackend.entity.Post;
import com.artbazar.artbazarbackend.entity.User;
import com.artbazar.artbazarbackend.entity.data.PostData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
    public List<PostData> getAll() {
        List<Post> posts = postRepository.findAll(Sort.by("createdAt").descending());
        return posts.stream()
                .map(post -> new PostData(post.getUser().getUsername(), post))
                .collect(Collectors.toList());
    }

    @Override
    public PostData addPost(String username, Post newPost) {
        User user = userRepository.findByUsername(username);
        newPost.setUser(user);
        Post savedPost = postRepository.save(newPost);
        return new PostData(user.getUsername(), savedPost);
    }
}
