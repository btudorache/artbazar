import styles from "./Comment.module.css";

const Comment = ({ commentData }) => {
  return (
    <div className={styles.commentLayout}>
      <p className={styles.commentOwner}>{commentData.owner}</p>
      <p className={styles.commentDate}>{new Date(commentData.createdAt).toDateString()}</p>
      <div className={styles.marginLine} />
      <p className={styles.commentText}>{commentData.text}</p>
    </div>
  );
};

export default Comment;
