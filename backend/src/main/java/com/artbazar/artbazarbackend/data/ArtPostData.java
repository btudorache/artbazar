package com.artbazar.artbazarbackend.data;

import lombok.Data;

@Data
public class ArtPostData {
    private final Long id;
    private final String title;
    private final String category;
    private final String description;
    private final String imageUrl;
}
