package com.artbazar.artbazarbackend.entity.enums;

import javax.persistence.AttributeConverter;
import java.util.stream.Stream;

public class PostTypeConverter implements AttributeConverter<PostType, String> {

    @Override
    public String convertToDatabaseColumn(PostType postType) {
        if (postType == null) {
            return null;
        }
        return postType.getPostType();
    }

    @Override
    public PostType convertToEntityAttribute(String postTypeString) {
        if (postTypeString == null) {
            return null;
        }

        return Stream.of(PostType.values())
                .filter(postType -> postType.getPostType().equals(postTypeString))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
