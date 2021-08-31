package com.artbazar.artbazarbackend.service;

import com.artbazar.artbazarbackend.entity.PostImage;
import com.artbazar.artbazarbackend.entity.data.PostData;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PostService {
    List<PostData> getAll();

    PostData getById(Long id);

    PostImage getPostImage(Long id);

    PostData addPost(String username, String title, String category, String description, MultipartFile file) throws IOException;
}
