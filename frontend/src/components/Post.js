import { useHistory } from "react-router";

import styles from "./Post.module.css";

import Button from "./Button";

const Post = ({postData, isDetail}) => {
  const history = useHistory()
  
  return (
    <div className={styles.postGrid}>
      <p className={styles.postUser}>{postData.postOwner}</p>
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
