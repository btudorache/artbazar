package com.artbazar.artbazarbackend.service;

import com.artbazar.artbazarbackend.dao.CommentRepository;
import com.artbazar.artbazarbackend.dao.PostRepository;
import com.artbazar.artbazarbackend.dao.UserRepository;
import com.artbazar.artbazarbackend.entity.Comment;
import com.artbazar.artbazarbackend.entity.Post;
import com.artbazar.artbazarbackend.entity.Image;
import com.artbazar.artbazarbackend.entity.User;
import com.artbazar.artbazarbackend.entity.data.PostData;
import com.artbazar.artbazarbackend.entity.data.PostDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PostServiceImpl implements PostService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    @Autowired
    public PostServiceImpl(UserRepository userRepository, PostRepository postRepository, CommentRepository commentRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    @Override
    public List<PostData> getAll() {
        List<Post> posts = postRepository.findAll(Sort.by("createdAt").descending());
        return posts.stream()
                .map(PostServiceImpl::mapToPostData)
                .collect(Collectors.toList());
    }

    @Override
    public PostDetail getPostDetailById(Long id) {
        return mapToPostDetail(postRepository.getById(id));
    }

    @Override
    public Image getPostImage(Long id) {
        return postRepository.getById(id).getImage();
    }

    @Override
    public PostData addPost(String username, String title, String category, String description, MultipartFile file) throws IOException {
        User user = userRepository.findByUsername(username);

        Image newImage = new Image(file.getBytes(), StringUtils.cleanPath(file.getOriginalFilename()), file.getContentType());
        Post newPost = new Post(title, category, description);

        newPost.setImage(newImage);
        newPost.setUser(user);
        Post newAddedPost = postRepository.save(newPost);

        String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                                                     .path("/api/posts/images/")
                                                     .path(newAddedPost.getId().toString())
                                                     .toUriString();
        newAddedPost.setImageUrl(imageUrl);

        Post postWithUrl = postRepository.save(newAddedPost);

        return mapToPostData(postWithUrl);
    }

    public static PostData mapToPostData(Post post) {
        return new PostData(post.getUser().getUsername(),
                                         post.getId(),
                                         post.getTitle(),
                                         post.getCategory(),
                                         post.getDescription(),
                                         post.getCreatedAt(),
                                         post.getImageUrl());
    }

    private PostDetail mapToPostDetail(Post post) {
        List<Comment> comments = commentRepository.findByPost(post, Sort.by("createdAt").descending());
        return new PostDetail(mapToPostData(post), comments);
    }
}
