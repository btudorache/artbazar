package com.artbazar.artbazarbackend.data;

import lombok.Data;

@Data
public class GeneralPostData {
    private final Long id;
    private final String content;
    private final Boolean hasImage;
    private final String imageUrl;
}
