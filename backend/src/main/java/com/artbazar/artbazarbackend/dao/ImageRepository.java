package com.artbazar.artbazarbackend.dao;

import com.artbazar.artbazarbackend.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
