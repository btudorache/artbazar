import { useHistory } from "react-router";
import { useSelector } from "react-redux";

import styles from "./UserPreview.module.css";

const UserPreview = ({ userPreview }) => {
  const authenticatedUsername = useSelector(state => state.auth.username)
  const history = useHistory()

  const userPreviewClickHandler = () => {
    if (userPreview.username === authenticatedUsername) {
      history.push('/profile')
    } else {
      history.push(`/users/${userPreview.username}`)
    }
  }

  return (
    <div onClick={userPreviewClickHandler} className={styles.userPreviewLayout}>
      <img className={styles.userPreviewImage} src={userPreview.imageUrl} alt="user profile"></img>
      <div className={styles.userPreviewInfo}>
        <p>{userPreview.username}</p>
        <p>{userPreview.usertype}</p>
      </div>
    </div>
  );
};

export default UserPreview;
