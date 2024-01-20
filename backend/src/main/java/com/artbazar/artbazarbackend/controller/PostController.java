package com.artbazar.artbazarbackend.controller;

import com.artbazar.artbazarbackend.aspect.annotation.LogExecutionTime;
import com.artbazar.artbazarbackend.data.ImageData;
import com.artbazar.artbazarbackend.data.PostData;
import com.artbazar.artbazarbackend.data.PostDetail;
import com.artbazar.artbazarbackend.entity.enums.PostCategory;
import com.artbazar.artbazarbackend.entity.enums.PostType;
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

    @GetMapping("/allposts/{targetUsername}")
    @LogExecutionTime
    public ResponseEntity<List<PostData>> getAllByUser(@PathVariable String targetUsername) {
        List<PostData> postDataList = postService.getUserPosts(targetUsername);
        return ResponseEntity.ok(postDataList);
    }

    @GetMapping("/dashboard")
    @LogExecutionTime
    public List<PostData> getDashboardPosts(Authentication authentication) {
        String loggedUserUsername = authentication.getName();
        return postService.getDashboardPosts(loggedUserUsername);
    }

    @GetMapping("/explore")
    @LogExecutionTime
    public List<PostData> getExplorePosts(Authentication authentication, @RequestParam(name = "category", required = false) PostCategory category) {
        String loggedUserUsername = authentication.getName();
        if (category == null) {
            return postService.getExplorePosts(loggedUserUsername);
        } else {
            return postService.getExplorePostsFiltered(loggedUserUsername, category.getCategory());
        }
    }

    @GetMapping("/random")
    @LogExecutionTime
    public ResponseEntity<Object> getRandomExplorePost(Authentication authentication) {
        try {
            String loggedUserUsername = authentication.getName();
            PostDetail postDetail = postService.getRandomExplorePost(loggedUserUsername);
            return ResponseEntity.ok(postDetail);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Post not found", HttpStatus.NOT_FOUND.value()));
        }
    }

    @GetMapping("/{id}")
    @LogExecutionTime
    public ResponseEntity<Object> getPostDetail(@PathVariable Long id) {
        PostDetail postDetail = postService.getPostDetailById(id);

        if (postDetail == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(new ApiResponse("Post not found", HttpStatus.NOT_FOUND.value()));
        }

        return ResponseEntity.ok(postDetail);
    }

    @GetMapping("/artpost")
    @LogExecutionTime
    public ResponseEntity<Object> getUserArtPosts(Authentication authentication) {
        try {
            String username = authentication.getName();
            List<PostData> postDataList = postService.getArtPosts(username);
            return ResponseEntity.ok(postDataList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Posts not found", HttpStatus.NOT_FOUND.value()));
        }
    }

    @PostMapping("/artpost")
    @LogExecutionTime
    public ResponseEntity<Object> addArtPost(Authentication authentication,
                                             @RequestParam("type") PostType postType,
                                             @RequestParam("file") MultipartFile file,
                                             @RequestParam("title") String title,
                                             @RequestParam("category") PostCategory category,
                                             @RequestParam("description") String description) {
        try {
            String username = authentication.getName();
            PostData addedPost = postService.addArtPost(username, postType, title, category, description, file);

            return ResponseEntity.status(HttpStatus.OK).body(addedPost);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(new ApiResponse(String.format("Could not upload the file: %s!", file.getOriginalFilename()), HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }

    @PostMapping("/generalpost")
    @LogExecutionTime
    public ResponseEntity<Object> addGeneralPost(Authentication authentication,
                                                 @RequestParam("type") PostType postType,
                                                 @RequestParam(name = "file", required = false) MultipartFile file,
                                                 @RequestParam("content") String content) {
        try {
            String username = authentication.getName();
            PostData addedPost = postService.addGeneralPost(username, postType, content, file);

            return ResponseEntity.status(HttpStatus.OK).body(addedPost);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(String.format("Could not upload the file: %s!", file.getOriginalFilename()), HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }

    @GetMapping("/images/artpost/{id}")
    @LogExecutionTime
    public ResponseEntity<byte[]> getArtPostImage(@PathVariable Long id) {
        ImageData imageData = postService.getArtPostImageData(id);

        if (imageData == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                             .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + imageData.getImageName() + "\"")
                             .contentType(MediaType.valueOf(imageData.getContentType()))
                             .body(imageData.getImage());
    }

    @GetMapping("/images/generalpost/{id}")
    @LogExecutionTime
    public ResponseEntity<byte[]> getGeneralPostImage(@PathVariable Long id) {
        ImageData imageData = postService.getGeneralPostImageData(id);

        if (imageData == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + imageData.getImageName() + "\"")
                .contentType(MediaType.valueOf(imageData.getContentType()))
                .body(imageData.getImage());
    }
}
