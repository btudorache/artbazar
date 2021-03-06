package com.artbazar.artbazarbackend.service;

import com.artbazar.artbazarbackend.dao.ImageRepository;
import com.artbazar.artbazarbackend.dao.PostRepository;
import com.artbazar.artbazarbackend.dao.UserRepository;
import com.artbazar.artbazarbackend.data.*;
import com.artbazar.artbazarbackend.entity.Image;
import com.artbazar.artbazarbackend.entity.post.Post;
import com.artbazar.artbazarbackend.entity.Profile;
import com.artbazar.artbazarbackend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final ImageRepository imageRepository;
    private final PasswordEncoder passwordEncoder;

    private final FollowerService followerService;
    private final PostService postService;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PostRepository postRepository, ImageRepository imageRepository, PasswordEncoder passwordEncoder, FollowerService followerService, PostService postService) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.imageRepository = imageRepository;
        this.passwordEncoder = passwordEncoder;
        this.followerService = followerService;
        this.postService = postService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Username not found");
        }

        List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(user.getType().getUserType()));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

    @Override
    public List<UserPreview> getAllUserData() {
        return userRepository.findAll().stream().map(this::mapToUserPreview).collect(Collectors.toList());
    }

    @Override
    public List<UserPreview> searchUser(String username) {
        String queryString = String.format("%%%s%%", username);
        return userRepository.findByUsernameLike(queryString).stream().map(this::mapToUserPreview).collect(Collectors.toList());
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User getUserByName(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public UserDetail getUserDetailByUsername(String requesterUsername, String targetUsername) {
        User user = userRepository.findByUsername(targetUsername);
        if (user == null) {
            return null;
        }

        List<Post> posts = postRepository.getUserArtPosts(user);
        boolean followExists = followerService.followExists(requesterUsername, targetUsername);
        long followers = followerService.countFollowingUser(targetUsername);
        return mapUserToUserDetail(user, posts, followExists, followers);
    }

    @Override
    public ImageData getUserProfileImageData(Long id) {
        Image image = userRepository.getById(id).getProfile().getProfileImage();
        if (image == null) {
            return null;
        }
        return new ImageData(image.getImage(), image.getImageName(), image.getContentType());
    }

    @Override
    public User saveUser(User newUser) {
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        User savedUser = userRepository.save(newUser);

        String defaultProfileImagePath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\default_profile.jpg";
        File defaultImageFile = new File(defaultProfileImagePath);

        byte[] imageData = new byte[(int) defaultImageFile.length()];

        try {
            InputStream inputStream = new FileInputStream(defaultImageFile);
            inputStream.read(imageData);
        } catch (IOException e) {
            return null;
        }

        Image profileImage = new Image(imageData, defaultImageFile.getName(), "image/jpeg");

        String imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/users/images/")
                .path(savedUser.getId().toString())
                .toUriString();

        Profile profile = new Profile(profileImage, imageUrl);
        savedUser.setProfile(profile);

        return userRepository.save(savedUser);
    }

    @Override
    public ProfileData editProfile(String username, String name, String location, String description, MultipartFile image) throws IOException {
        User user = userRepository.findByUsername(username);
        Profile profile = user.getProfile();
        if (name != null && !name.trim().isEmpty()) {
            profile.setName(name);
        }
        if (location != null && !location.trim().isEmpty()) {
            profile.setLocation(location);
        }
        if (description != null && !description.trim().isEmpty()) {
            profile.setDescription(description);
        }

        if (image != null && !image.isEmpty()) {
            imageRepository.delete(profile.getProfileImage());
            Image newImage = new Image(image.getBytes(), StringUtils.cleanPath(image.getOriginalFilename()), image.getContentType());
            profile.setProfileImage(newImage);
        }

        return mapToProfileData(userRepository.save(user).getProfile());
    }

    public UserPreview mapToUserPreview(User user) {
        Profile userProfile = user.getProfile();
        return new UserPreview(user.getId(), user.getUsername(), user.getType().name(), userProfile.getImageUrl());
    }

    public ProfileData mapToProfileData(Profile profile) {
        return new ProfileData(profile.getName(), profile.getLocation(), profile.getDescription());
    }

    public UserDetail mapUserToUserDetail(User user, List<Post> posts, boolean followExists, long followingUsersCount) {
        Profile userProfile = user.getProfile();
        List<PostData> mappedPosts = posts.stream().map(postService::mapToPostData).collect(Collectors.toList());

        return new UserDetail(
                user.getUsername(),
                user.getType().getUserType(),
                user.getEmail(),
                user.getCreatedAt(),
                userProfile.getName(),
                userProfile.getLocation(),
                userProfile.getDescription(),
                userProfile.getImageUrl(),
                mappedPosts,
                followExists,
                followingUsersCount);
    }
}
