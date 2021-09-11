package com.artbazar.artbazarbackend.data;

import lombok.Data;

@Data
public class UserData {
    private final String username;
    private final String email;
    private final String type;
    private final Long createdAt;
}
