package com.artbazar.artbazarbackend.controller;

import com.artbazar.artbazarbackend.entity.PostImage;
import com.artbazar.artbazarbackend.entity.data.PostData;
import com.artbazar.artbazarbackend.entity.data.PostDetail;
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

    @GetMapping("")
    public List<PostData> getAllPosts() {
        return postService.getAll();
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
        PostImage postImage = postService.getPostImage(id);

        if (postImage == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                             .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + postImage.getImageName() + "\"")
                             .contentType(MediaType.valueOf(postImage.getContentType()))
                             .body(postImage.getImage());
    }
}
