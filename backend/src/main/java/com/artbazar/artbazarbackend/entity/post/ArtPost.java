package com.artbazar.artbazarbackend.entity.post;

import com.artbazar.artbazarbackend.entity.Image;
import com.artbazar.artbazarbackend.entity.enums.PostCategory;
import com.artbazar.artbazarbackend.entity.enums.PostCategoryConverter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="art_post")
public class ArtPost {

    public ArtPost(String title, PostCategory category, String description, Image image) {
        this.category = category;
        this.description = description;
        this.title = title;
        this.image = image;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "category")
    @Convert(converter = PostCategoryConverter.class)
    private PostCategory category;

    @Column(name = "description")
    private String description;

    @OneToOne(optional = false, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="image_id", nullable = false)
    private Image image;

    @Column(name = "image_url")
    private String imageUrl;
}
