package com.artbazar.artbazarbackend.service;

import com.artbazar.artbazarbackend.entity.Post;
import com.artbazar.artbazarbackend.entity.data.PostData;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface PostService {
    List<PostData> getAll();

    Optional<Post> findById(Long id);

    PostData addPost(String username, String title, String category, String description, MultipartFile file) throws IOException;
}
