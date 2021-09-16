package com.artbazar.artbazarbackend.data;

import lombok.Data;

@Data
public class UserPreview {
    private final Long id;
    private final String username;
    private final String usertype;
    private final String imageUrl;
}
