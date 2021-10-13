package com.artbazar.artbazarbackend.dao;

import com.artbazar.artbazarbackend.entity.post.Post;
import com.artbazar.artbazarbackend.entity.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUser(User user, Sort sort);

    @Query(value = "SELECT * FROM post " +
                   "WHERE post.user_id IN (SELECT followed_user_id FROM follower " +
                                          "WHERE following_user_id = ?1) " +
                   "ORDER BY created_at DESC", nativeQuery = true)
    List<Post> getFollowedPosts(User loggedUser);

    @Query(value = "SELECT * FROM post " +
                   "JOIN art_post ON post.art_post_id = art_post.id " +
                   "WHERE post.user_id NOT IN (SELECT followed_user_id FROM follower " +
                                              "WHERE following_user_id = ?1) " +
                   "AND post.user_id != ?1 " +
                   "AND art_post.category = ?2 " +
                   "AND post.type = 'Art' " +
                   "ORDER BY created_at DESC", nativeQuery = true)
    List<Post> getUnfollowedArtPostsFiltered(User loggedUser, String category);

    @Query(value = "SELECT * FROM post " +
                   "WHERE post.user_id NOT IN (SELECT followed_user_id FROM follower " +
                                              "WHERE following_user_id = ?1) " +
                   "AND post.user_id != ?1 " +
                   "AND post.type = 'Art' " +
                   "ORDER BY created_at DESC", nativeQuery = true)
    List<Post> getUnfollowedArtPosts(User loggedUser);
}
