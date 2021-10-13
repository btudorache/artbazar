package com.artbazar.artbazarbackend.service;

import com.artbazar.artbazarbackend.dao.CommentRepository;
import com.artbazar.artbazarbackend.dao.PostRepository;
import com.artbazar.artbazarbackend.entity.Comment;
import com.artbazar.artbazarbackend.entity.post.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentService, PostRepository postRepository) {
        this.commentRepository = commentService;
        this.postRepository = postRepository;
    }

    @Override
    public List<Comment> getComments() {
        return commentRepository.findAll();
    }

    @Override
    public Comment addComment(String text, String owner, Long postId) {
        Comment comment = new Comment(text, owner);
        Post post = postRepository.getById(postId);
        comment.setPost(post);

        return commentRepository.save(comment);
    }
}
