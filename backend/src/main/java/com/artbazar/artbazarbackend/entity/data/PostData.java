package com.artbazar.artbazarbackend.entity.data;

import com.artbazar.artbazarbackend.entity.Post;
import lombok.Data;

@Data
public class PostData {
    private final String postOwner;
    private final Post post;
}
