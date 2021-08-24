import styles from "./Post.module.css";

const Post = () => {
  return (
    <div className={styles.postGrid}>
      <p className={styles.postUser}>Username</p>
      <p className={styles.postDate}>Date</p>
      <div className={styles.underline} />
      <h2 className={styles.postTitle}>Title</h2>
      <div className={styles.postPhoto}>
        <img className={styles.photo} src="https://lionalert.org/wp-content/uploads/2020/01/Lion-Cubs.jpg"/>
      </div>
      <p className={styles.postDescription}>
        Description description description description description description
        description description description description description description
        description description description description description description
        description description.
      </p>
    </div>
  );
};

export default Post;
