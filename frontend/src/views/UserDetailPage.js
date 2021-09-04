import { useSelector } from "react-redux";
import { useParams } from "react-router";

import styles from "./UserDetailPage.module.css";

import Button from "../components/Button";
import Post from "../components/Post";

const UserDetailPage = ({ isLoggedUser }) => {
  const loggedUsername = useSelector((state) => state.auth.username);
  const { urlUsername } = useParams();
  const userDetailName = isLoggedUser ? loggedUsername : urlUsername;

  return (
    <div className={styles.mainLayout}>
      <div className={styles.mainUserDetailsSection}>
        <div className={styles.userImage}>
          <p>image</p>
        </div>
        <div className={styles.mainUserDetailsInfo}>
          <div className={styles.mainUserDetailsInfoList}>
            <h2>Account Information</h2>
            <p>Username: {userDetailName}</p>
            <p>Email: </p>
            <p>Usertype: </p>
            <p>Join Date: </p>
          </div>
          <div className={styles.mainUserDetailsButtons}>
            <Button text="Follow" additionalStyles={[styles.profileButton]} />
            <Button text="Commission" additionalStyles={[styles.profileButton]} />
            {isLoggedUser && <Button text="Edit Profile" additionalStyles={[styles.profileButton]}/>}
          </div>
        </div>
      </div>
      <div className={styles.sectionDelimiter} />
      <div className={styles.secondaryUserDetailsSection}>
        <h2>Personal Information</h2>
        <p>First Name:</p>
        <p>Last Name:</p>
        <p>Location:</p>
      </div>
      <div className={styles.sectionDelimiter} />
      <div className={styles.userPostsSection}>
        <h2>Works</h2>
      </div>
    </div>
  );
};

export default UserDetailPage;
