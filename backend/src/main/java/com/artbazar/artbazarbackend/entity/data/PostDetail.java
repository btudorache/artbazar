package com.artbazar.artbazarbackend.entity.data;

import com.artbazar.artbazarbackend.entity.Comment;
import lombok.Data;

import java.util.List;

@Data
public class PostDetail {
    private final PostData postData;
    private final List<Comment> comments;
}
