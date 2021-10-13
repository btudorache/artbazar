package com.artbazar.artbazarbackend.entity;

import com.artbazar.artbazarbackend.entity.enums.UserType;
import com.artbazar.artbazarbackend.entity.enums.UserTypeConverter;
import com.artbazar.artbazarbackend.entity.post.Post;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@ToString
@Table(name="users")
public class User {

    public User(String username, String password, UserType type, String email) {
        this.username = username;
        this.password = password;
        this.type = type;
        this.email = email;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Long id;

    @Column(name="username", unique=true)
    private String username;

    @Column(name="password")
    private String password;

    @Column(name="type")
    @Convert(converter = UserTypeConverter.class)
    private UserType type;

    @Column(name="email", unique = true)
    private String email;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name="profile_id")
    private Profile profile;

    @JsonManagedReference
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Post> posts;

    @Column(name="created_at")
    private Long createdAt;

    @PrePersist
    public void addTimeStamp() {
        createdAt = System.currentTimeMillis();
    }


}
