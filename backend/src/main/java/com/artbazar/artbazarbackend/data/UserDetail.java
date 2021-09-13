package com.artbazar.artbazarbackend.data;

import lombok.Data;

import java.util.List;

@Data
public class UserDetail {
    private final String username;
    private final String usertype;
    private final String email;
    private final Long createdAt;
    private final String name;
    private final String location;
    private final String description;
    private final String profileImageUrl;
    private final List<PostData> posts;
    private final boolean followExists;
    private final long followers;
}
