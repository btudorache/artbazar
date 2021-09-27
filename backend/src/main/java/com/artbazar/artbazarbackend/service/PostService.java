package com.artbazar.artbazarbackend.service;

import com.artbazar.artbazarbackend.data.ImageData;
import com.artbazar.artbazarbackend.entity.Image;
import com.artbazar.artbazarbackend.data.PostData;
import com.artbazar.artbazarbackend.data.PostDetail;
import com.artbazar.artbazarbackend.entity.enums.PostCategory;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PostService {
    List<PostData> getAll();

    List<PostData> getDashboardPosts(String loggedUserUsername);

    List<PostData> getExplorePosts(String loggedUserUsername);

    List<PostData> getExplorePostsFiltered(String loggedUserUsername, String category);

    PostDetail getRandomExplorePost(String loggedUserUsername);

    PostDetail getPostDetailById(Long id);

    ImageData getPostImageData(Long id);

    PostData addPost(String username, String title, PostCategory category, String description, MultipartFile file) throws IOException;
}
