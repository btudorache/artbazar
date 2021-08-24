import styles from "./Post.module.css";

const Post = ({postData}) => {
  const post = postData.post

  return (
    <div className={styles.postGrid}>
      <p className={styles.postUser}>{postData.postOwner}</p>
      <p className={styles.postDate}>{post.createdAt}</p>
      <div className={styles.underline} />
      <h2 className={styles.postTitle}>{post.title}</h2>
      <div className={styles.postPhoto}>
        <img className={styles.photo} src="https://lionalert.org/wp-content/uploads/2020/01/Lion-Cubs.jpg"/>
      </div>
      <p className={styles.postDescription}>
        {post.description}
      </p>
    </div>
  );
};

export default Post;
