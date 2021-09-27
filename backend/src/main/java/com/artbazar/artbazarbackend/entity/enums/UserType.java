package com.artbazar.artbazarbackend.entity.enums;

public enum UserType {
    ARTIST("Artist"),
    EXPLORER("Explorer");

    private final String userType;

    UserType(String userType) {
        this.userType = userType;
    }

    public String getUserType() {
        return userType;
    }
}
