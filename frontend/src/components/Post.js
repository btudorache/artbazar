import styles from "./Post.module.css";

const Post = ({postData}) => {
  return (
    <div className={styles.postGrid}>
      <p className={styles.postUser}>{postData.postOwner}</p>
      <p className={styles.postDate}>{new Date(postData.createdAt).toDateString()}</p>
      <div className={styles.underline} />
      <h2 className={styles.postTitle}>{postData.title}</h2>
      <div className={styles.postPhoto}>
        <img className={styles.photo} src={postData.url}/>
      </div>
      <h4 className={styles.postCategory}>Category: {postData.category}</h4>
      <p className={styles.postDescription}>
        {postData.description}
      </p>
    </div>
  );
};

export default Post;
