package com.artbazar.artbazarbackend.entity;

import com.artbazar.artbazarbackend.entity.enums.PostCategory;
import com.artbazar.artbazarbackend.entity.enums.PostCategoryConverter;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="post")
public class Post {

    public Post(String title, PostCategory category, String description) {
        this.category = category;
        this.description = description;
        this.title = title;
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

    @Column(name = "created_at")
    private Long createdAt;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @JsonManagedReference
    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Comment> comments;

    @OneToOne(optional = false, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="image_id", nullable = false)
    private Image image;

    @Column(name = "image_url")
    private String imageUrl;

    @PrePersist
    public void addTimeStamp() {
        createdAt = System.currentTimeMillis();
    }
}
