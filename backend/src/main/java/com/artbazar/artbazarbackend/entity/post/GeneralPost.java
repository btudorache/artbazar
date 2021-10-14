package com.artbazar.artbazarbackend.entity.post;

import com.artbazar.artbazarbackend.entity.Image;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="general_post")
public class GeneralPost {

    public GeneralPost(String content) {
        this.content = content;
        this.hasImage = false;
    }

    public GeneralPost(String content, Image image) {
        this.content = content;
        this.image = image;
        this.hasImage = true;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "content")
    private String content;

    @Column(name = "has_image")
    private Boolean hasImage;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="image_id")
    private Image image;

    @Column(name = "image_url")
    private String imageUrl;
}
