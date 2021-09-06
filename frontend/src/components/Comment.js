import { useHistory } from "react-router";
import { useSelector } from "react-redux";

import styles from "./Comment.module.css";

const Comment = ({ commentData }) => {
  const loggedUsername = useSelector(state => state.auth.username)
  const history = useHistory()

  const navigateToUserProfile = () => {
    const finalUrl = loggedUsername === commentData.owner ? "/profile" : `/users/${commentData.owner}`
    history.push(finalUrl)
  }

  return (
    <div className={styles.commentLayout}>
      <div className={styles.commentOwnerDiv}>
        <p onClick={navigateToUserProfile} className={styles.commentOwner}>{commentData.owner}</p>
      </div>
      <p className={styles.commentDate}>{new Date(commentData.createdAt).toDateString()}</p>
      <div className={styles.marginLine} />
      <p className={styles.commentText}>{commentData.text}</p>
    </div>
  );
};

export default Comment;
