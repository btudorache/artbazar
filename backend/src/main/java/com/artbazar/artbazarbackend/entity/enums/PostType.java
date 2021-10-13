package com.artbazar.artbazarbackend.entity.enums;

public enum PostType {
    ART_POST("Art"), REVIEW_POST("Review"), GENERAL_POST("General");

    private final String PostType;

    PostType(String postType) {
        PostType = postType;
    }

    public String getPostType() {
        return PostType;
    }
}
