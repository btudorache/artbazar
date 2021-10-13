package com.artbazar.artbazarbackend.entity.enums;

import javax.persistence.AttributeConverter;
import java.util.stream.Stream;

public class UserTypeConverter implements AttributeConverter<UserType, String> {

    @Override
    public String convertToDatabaseColumn(UserType userType) {
        if (userType == null) {
            return null;
        }
        return userType.getUserType();
    }

    @Override
    public UserType convertToEntityAttribute(String userTypeString) {
        if (userTypeString == null) {
            return null;
        }

        return Stream.of(UserType.values())
                .filter(type -> type.getUserType().equals(userTypeString))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
