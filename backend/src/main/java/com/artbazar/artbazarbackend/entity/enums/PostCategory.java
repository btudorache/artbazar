package com.artbazar.artbazarbackend.entity.enums;

public enum PostCategory {
    PAINTING("Painting"), CRAFTS("Crafts"), DIGITAL("Digital"), DRAWING("Drawing"), PHOTOGRAPHY("Photography");

    private final String category;

    PostCategory(String category) {
        this.category = category;
    }

    public String getCategory() {
        return category;
    }
}
