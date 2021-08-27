package com.artbazar.artbazarbackend.entity.data;

import lombok.Data;

@Data
public class PostData {
    private final String postOwner;
    private final Long id;
    private final String title;
    private final String category;
    private final String description;
    private final Long createdAt;
    private final String url;
}
