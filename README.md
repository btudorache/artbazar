# ArtBazar

Social website dedicated to artists for an easier way to share their work to the world. Built with React and Spring Boot PostgreSQL. The main idea is that there are 2 types of users: **Artists** and **Explorers**. *Artists* will be able to post their art based on categories, and *Explorers* will be able to interact with *Artits*, rate their works and even commision works from them.

## Setup

You can set up the app locally with **Docker** and **Docker Compose**:

```
docker-compose up -d
```

And then go to the local server at http://localhost:3000/. Currently there is no initial database set up.

## Features

I plan on adding a variety of features. Here is the current state of the app:

### Added Features

* Register and Login functionalities
* Main page for new users
* *Artists* can post their works for others to see
* Comment functionality on posts
* Main dashboard where you can see all the posts

### To be added

* "Random Art" button to find new artists you don't know about
* Profile customization
* Possibiliy to Follow other users
* Make *Explorers* be able to commission works from *Artists*
* Add "Explore" section where you can find other artists to follow
* Show posts on feed based on preferences and follows
* Functionality for *Explorers* to rate and review *Artists*
* Add initial database to showcase most of the functionalities working togheter


