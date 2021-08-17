package com.artbazar.artbazarbackend.entity;

public enum UserType {
    ARTIST (1),
    EXPLORER (2);

    private final int type;

    UserType(int type) {
        this.type = type;
    }

    public int getType() {
        return type;
    }
}
