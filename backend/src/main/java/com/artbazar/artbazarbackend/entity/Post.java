package com.artbazar.artbazarbackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.awt.*;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "post_id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "category")
    private String category;

    @Column(name = "description")
    private String description;

    @Column(name = "created_at")
    private Long createdAt;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="post_image_id")
    private PostImage postImage;

    public Post(String title, String category, String description) {
        this.category = category;
        this.description = description;
        this.title = title;
    }

    @PrePersist
    public void addTimeStamp() {
        createdAt = System.currentTimeMillis();
    }
}
