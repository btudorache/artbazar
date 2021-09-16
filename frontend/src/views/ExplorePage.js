import { useState } from "react";

import styles from "./ExplorePage.module.css";

import ExplorePosts from "../components/layout/ExplorePosts";
import ExploreUsers from "../components/layout/ExploreUsers";

const ExplorePage = () => {
  const [showByPosts, setShowByPosts] = useState(true)

  const postsOptionHandler = () => {
    setShowByPosts(true)
  }

  const usersOptionHandler = () => {
    setShowByPosts(false)
  }

  const postsTextClass = showByPosts ? styles.selectedOptionText : styles.unselectedOptionText
  const usersTextClass = !showByPosts ? styles.selectedOptionText : styles.unselectedOptionText

  return (
    <div className={styles.explorePageLayout}>
      <div className={styles.exploreOptions}>
        <h1 onClick={postsOptionHandler} className={postsTextClass}>Art</h1>
        {/* <div className={styles.optionsDelimiter} /> */}
        <h1 onClick={usersOptionHandler} className={usersTextClass}>Users</h1>
      </div>
      <div className={styles.sectionDelimiter} />
      {showByPosts && <ExplorePosts />}
      {!showByPosts && <ExploreUsers />}
    </div>
  );
};

export default ExplorePage;
