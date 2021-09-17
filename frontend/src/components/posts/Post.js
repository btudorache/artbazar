import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import styles from "./Post.module.css";

import Button from "../layout/general/Button";

const Post = ({postData, isDetail}) => {
  const loggedUsername = useSelector(state => state.auth.username)
  const history = useHistory()

  const navigateToUserProfile = () => {
    const finalUrl = loggedUsername === postData.postOwner ? "/profile" : `/users/${postData.postOwner}`
    history.push(finalUrl)
  }
  
  return (
    <div className={styles.postGrid}>
      <div className={styles.postUserDiv}>
        <p onClick={navigateToUserProfile} className={styles.postUser}>{postData.postOwner}</p>
      </div>
      <p className={styles.postDate}>{new Date(postData.createdAt).toDateString()}</p>
      <div className={styles.underline} />
      <h2 className={styles.postTitle}>{postData.title}</h2>
      <h4 className={styles.postCategory}>Category: {postData.category}</h4>
      <p className={styles.postDescription}>
        {postData.description}
      </p>
      <div className={styles.postPhoto}>
        <img className={styles.photo} src={postData.url}/>
      </div>
      <div className={styles.likeDiv}>
        <Button text="Like" additionalStyles={[styles.likeButton]} />
        <p className={styles.likesAmount}>123 likes</p>
      </div>
      {!isDetail && <Button text="See Post" additionalStyles={[styles.detailButton]} clickHandler={() => history.push(`/posts/${postData.id}`)} />}
    </div>
  );
};

export default Post;
