package com.artbazar.artbazarbackend.entity.data;

import lombok.Data;

import java.util.List;

@Data
public class UserDetail {
    private final String username;
    private final String usertype;
    private final String email;
    private final String firstname;
    private final String lastname;
    private final String location;
    private final String profileImageUrl;
    private final List<PostData> posts;
}
