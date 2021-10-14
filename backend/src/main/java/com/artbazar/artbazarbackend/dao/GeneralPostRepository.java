package com.artbazar.artbazarbackend.dao;

import com.artbazar.artbazarbackend.entity.post.GeneralPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GeneralPostRepository extends JpaRepository<GeneralPost, Long> {
}
