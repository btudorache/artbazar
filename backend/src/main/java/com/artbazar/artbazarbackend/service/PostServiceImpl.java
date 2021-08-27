package com.artbazar.artbazarbackend.service;

import com.artbazar.artbazarbackend.dao.PostRepository;
import com.artbazar.artbazarbackend.dao.UserRepository;
import com.artbazar.artbazarbackend.entity.Post;
import com.artbazar.artbazarbackend.entity.PostImage;
import com.artbazar.artbazarbackend.entity.User;
import com.artbazar.artbazarbackend.entity.data.PostData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
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
                .map(this::mapToPostData)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Post> findById(Long id) {
        return postRepository.findById(id);
    }

    @Override
    public PostData addPost(String username, String title, String category, String description, MultipartFile file) throws IOException {
        User user = userRepository.findByUsername(username);
        PostImage newPostImage = new PostImage(file.getBytes(), StringUtils.cleanPath(file.getOriginalFilename()), file.getContentType());
        Post newPost = new Post(title, category, description);
        newPost.setPostImage(newPostImage);
        newPost.setUser(user);
        Post newAddedPost = postRepository.save(newPost);
        return mapToPostData(newAddedPost);
    }

    private PostData mapToPostData(Post post) {
        String downloadURL = ServletUriComponentsBuilder.fromCurrentContextPath()
                                                        .path("/api/posts/images/")
                                                        .path(post.getId().toString())
                                                        .toUriString();

        return new PostData(post.getUser().getUsername(),
                                         post.getId(),
                                         post.getTitle(),
                                         post.getCategory(),
                                         post.getDescription(),
                                         post.getCreatedAt(),
                                         downloadURL);
    }
}
