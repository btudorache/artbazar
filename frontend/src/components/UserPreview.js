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

  var usertype
  if (userPreview.usertype === "ARTIST") {
    usertype = "Artist"
  } else if (userPreview.usertype === "EXPLORER") {
    usertype = "Explorer"
  }

  return (
    <div onClick={userPreviewClickHandler} className={styles.userPreviewLayout}>
      <img className={styles.userPreviewImage} src={userPreview.imageUrl}></img>
      <div className={styles.userPreviewInfo}>
        <p>{userPreview.username}</p>
        <p>{usertype}</p>
      </div>
    </div>
  );
};

export default UserPreview;
