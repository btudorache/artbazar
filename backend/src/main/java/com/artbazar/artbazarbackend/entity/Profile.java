package com.artbazar.artbazarbackend.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "profile")
public class Profile {

    public Profile(Image profileImage, String imageUrl) {
        this.profileImage = profileImage;
        this.imageUrl = imageUrl;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "location")
    private String location;

    @OneToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_image_id")
    private Image profileImage;

    @Column(name = "image_url")
    private String imageUrl;
}
