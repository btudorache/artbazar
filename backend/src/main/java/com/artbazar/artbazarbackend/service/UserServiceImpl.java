package com.artbazar.artbazarbackend.service;

import com.artbazar.artbazarbackend.dao.ImageRepository;
import com.artbazar.artbazarbackend.dao.PostRepository;
import com.artbazar.artbazarbackend.dao.UserRepository;
import com.artbazar.artbazarbackend.entity.Image;
import com.artbazar.artbazarbackend.entity.Post;
import com.artbazar.artbazarbackend.entity.Profile;
import com.artbazar.artbazarbackend.entity.User;
import com.artbazar.artbazarbackend.entity.data.PostData;
import com.artbazar.artbazarbackend.entity.data.UserDetail;
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

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PostRepository postRepository, ImageRepository imageRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.imageRepository = imageRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Username not found");
        }

        List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(user.getType()));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
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
    public UserDetail getUserDetailByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return null;
        }

        List<Post> posts = postRepository.findByUser(user, Sort.by("createdAt").descending());
        return mapUserToUserDetail(user, posts);
    }

    @Override
    public Image getUserProfileImage(Long id) {
        return userRepository.getById(id).getProfile().getProfileImage();
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
    public Profile editProfileWithImage(String username, String name, String location, String description, MultipartFile image) throws IOException {
        User user = userRepository.findByUsername(username);
        Profile profile = user.getProfile();
        validateStringFields(profile, name, location, description);

        if (image != null && !image.isEmpty()) {
            imageRepository.delete(profile.getProfileImage());
            Image newImage = new Image(image.getBytes(), StringUtils.cleanPath(image.getOriginalFilename()), image.getContentType());
            profile.setProfileImage(newImage);
        }

        return userRepository.save(user).getProfile();
    }

    @Override
    public Profile editProfileWithoutImage(String username, String name, String location, String description) {
        User user = userRepository.findByUsername(username);
        Profile profile = user.getProfile();
        validateStringFields(profile, name, location, description);

        return userRepository.save(user).getProfile();
    }

    private void validateStringFields(Profile profile, String name, String location, String description) {
        if (name != null && !name.trim().isEmpty()) {
            profile.setName(name);
        }
        if (location != null && !location.trim().isEmpty()) {
            profile.setLocation(location);
        }
        if (description != null && !description.trim().isEmpty()) {
            profile.setDescription(description);
        }
    }

    public UserDetail mapUserToUserDetail(User user, List<Post> posts) {
        Profile userProfile = user.getProfile();
        List<PostData> mappedPosts = posts.stream().map(PostServiceImpl::mapToPostData).collect(Collectors.toList());

        return new UserDetail(
                user.getUsername(),
                user.getType(),
                user.getEmail(),
                user.getCreatedAt(),
                userProfile.getName(),
                userProfile.getLocation(),
                userProfile.getDescription(),
                userProfile.getImageUrl(),
                mappedPosts);
    }
}
