package com.artbazar.artbazarbackend.entity.post;

import com.artbazar.artbazarbackend.entity.Comment;
import com.artbazar.artbazarbackend.entity.User;
import com.artbazar.artbazarbackend.entity.enums.PostType;
import com.artbazar.artbazarbackend.entity.enums.PostTypeConverter;
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

    public Post(PostType postType) {
        this.postType = postType;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @Column(name = "type")
    @Convert(converter = PostTypeConverter.class)
    private PostType postType;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "art_post_id")
    private ArtPost artPost;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "general_post_id")
    private GeneralPost generalPost;

    @JsonManagedReference
    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Comment> comments;

    @Column(name = "created_at")
    private Long createdAt;

    @PrePersist
    public void addTimeStamp() {
        createdAt = System.currentTimeMillis();
    }
}
