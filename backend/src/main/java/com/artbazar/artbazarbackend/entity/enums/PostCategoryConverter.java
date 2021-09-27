package com.artbazar.artbazarbackend.entity.enums;

import javax.persistence.AttributeConverter;
import java.util.stream.Stream;

public class PostCategoryConverter implements AttributeConverter<PostCategory, String> {

    @Override
    public String convertToDatabaseColumn(PostCategory postCategory) {
        if (postCategory == null) {
            return null;
        }
        return postCategory.getCategory();
    }

    @Override
    public PostCategory convertToEntityAttribute(String postCategoryString) {
        if (postCategoryString == null) {
            return null;
        }

        return Stream.of(PostCategory.values())
                .filter(category -> category.getCategory().equals(postCategoryString))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
