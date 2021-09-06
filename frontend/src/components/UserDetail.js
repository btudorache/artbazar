import { Fragment } from "react";

import styles from "./UserDetail.module.css";

import Button from "./Button";
import Post from "./Post";

const UserDetail = ({ isLoggedUser, userDetail }) => {
  const userIsArtist = userDetail.usertype === "ARTIST";

  const WorksSection = (
    <Fragment>
      <div className={styles.sectionDelimiter} />
      <div className={styles.userPostsSection}>
        <h2>Works</h2>
        <ul className={styles.userPostsGrid}>
          {userDetail.posts.map((postData) => (
            <li key={postData.id}>
              <Post postData={postData} />
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );

  return (
    <div className={styles.userDetailLayout}>
      <div className={styles.mainUserDetailsSection}>
        <div className={styles.userImageDiv}>
          <img className={styles.userImage} src={userDetail.profileImageUrl} />
        </div>
        <div className={styles.mainUserDetailsInfo}>
          <div className={styles.mainUserDetailsInfoList}>
            <h2>Account Information</h2>
            <p>Username: {userDetail.username}</p>
            <p>Email: {userDetail.email}</p>
            <p>User Type: {userDetail.usertype}</p>
            <p>Join Date: {new Date(userDetail.createdAt).toDateString()}</p>
            <p>Followers: </p>
          </div>
          <div className={styles.mainUserDetailsButtons}>
            {!isLoggedUser && (
              <Fragment>
                <Button
                  text="Follow"
                  additionalStyles={[styles.profileButton]}
                />
                <Button
                  text="Commission"
                  additionalStyles={[styles.profileButton]}
                />
              </Fragment>
            )}
            {isLoggedUser && (
              <Button
                text="Edit Profile"
                additionalStyles={[styles.profileButton]}
              />
            )}
          </div>
        </div>
      </div>
      <div className={styles.sectionDelimiter} />
      <div className={styles.secondaryUserDetailsSection}>
        <h2>Personal Information</h2>
        {userDetail.description && <p>{userDetail.description}</p>}
        <p>Name: {userDetail.name}</p>
        <p>Location: {userDetail.location}</p>
      </div>
      {userIsArtist && WorksSection}
    </div>
  );
};

export default UserDetail;
