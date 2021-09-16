package com.artbazar.artbazarbackend.data;

import lombok.Data;

@Data
public class ImageData {
    private final byte[] image;
    private final String imageName;
    private final String contentType;
}
