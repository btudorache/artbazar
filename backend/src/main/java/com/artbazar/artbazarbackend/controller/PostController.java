package com.artbazar.artbazarbackend.controller;

import com.artbazar.artbazarbackend.entity.Image;
import com.artbazar.artbazarbackend.data.PostData;
import com.artbazar.artbazarbackend.data.PostDetail;
import com.artbazar.artbazarbackend.service.PostService;
import com.artbazar.artbazarbackend.utils.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/dashboard")
    public List<PostData> getDashboardPosts(Authentication authentication) {
        String loggedUserUsername = authentication.getName();
        return postService.getDashboardPosts(loggedUserUsername);
    }

    @GetMapping("/explore")
    public List<PostData> getExplorePosts(Authentication authentication) {
        String loggedUserUsername = authentication.getName();
        return postService.getExplorePosts(loggedUserUsername);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getPostDetail(@PathVariable Long id) {
        PostDetail postDetail = postService.getPostDetailById(id);

        if (postDetail == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(new ApiResponse("Post not found", HttpStatus.NOT_FOUND.value()));
        }

        return ResponseEntity.ok(postDetail);
    }

    @PostMapping("")
    public ResponseEntity<Object> addPost(Authentication authentication,
                                          @RequestParam("file") MultipartFile file,
                                          @RequestParam("title") String title,
                                          @RequestParam("category") String category,
                                          @RequestParam("description") String description) {
        try {
            String username = authentication.getName();
            PostData addedPost = postService.addPost(username, title, category, description, file);

            return ResponseEntity.status(HttpStatus.OK).body(addedPost);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(new ApiResponse(String.format("Could not upload the file: %s!", file.getOriginalFilename()), HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }

    @GetMapping("/images/{id}")
    public ResponseEntity<byte[]> getPostImage(@PathVariable Long id) {
        Image image = postService.getPostImage(id);

        if (image == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                             .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + image.getImageName() + "\"")
                             .contentType(MediaType.valueOf(image.getContentType()))
                             .body(image.getImage());
    }
}
