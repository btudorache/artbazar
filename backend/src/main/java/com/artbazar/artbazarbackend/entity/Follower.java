package com.artbazar.artbazarbackend.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "follower", uniqueConstraints=@UniqueConstraint(columnNames={"following_user_id", "followed_user_id"}))
@Getter
@Setter
@NoArgsConstructor
public class Follower {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "following_user_id", nullable = false)
    private User followingUser;

    @ManyToOne()
    @JoinColumn(name = "followed_user_id", nullable = false)
    private User followedUser;

    public Follower(User followingUser, User followedUser) {
        this.followingUser = followingUser;
        this.followedUser = followedUser;
    }
}
