package com.artbazar.artbazarbackend.data;

import lombok.Data;

@Data
public class PostData {
    private final String postOwner;
    private final Long id;
    private final String postType;
    private final ArtPostData artPostData;
    private final GeneralPostData generalPostData;
    private final Long createdAt;
}
