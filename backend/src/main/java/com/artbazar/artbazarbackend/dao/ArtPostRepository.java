package com.artbazar.artbazarbackend.dao;

import com.artbazar.artbazarbackend.entity.post.ArtPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtPostRepository extends JpaRepository<ArtPost, Long> {
}
