package com.artbazar.artbazarbackend.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="post_image")
@Getter
@Setter
@NoArgsConstructor
public class PostImage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "post_image_id")
    private Long id;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_name")
    private String imageName;

    @Column(name = "content_type")
    private String contentType;

    public PostImage(byte[] image, String imageName, String contentType) {
        this.image = image;
        this.imageName = imageName;
        this.contentType = contentType;
    }
}
