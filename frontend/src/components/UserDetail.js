import { Fragment } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import styles from "./UserDetail.module.css";

import { resetPosts } from "../store/postsSlice";
import Button from "./Button";
import Post from "./Post";

const UserDetail = ({ isLoggedUser, userDetail, setUserDetail }) => {
  const dispatch = useDispatch()
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);

  const userIsArtist = userDetail.usertype === "ARTIST";

  const editProfileButtonHandler = () => {
    history.push("/profile/edit");
  };

  var followButonStyles = [styles.profileButton];
  if (userDetail.followExists) {
    followButonStyles.push(styles.followExistsButton);
  } else {
    followButonStyles.push(styles.notFollowExistsButton);
  }

  const followUserButtonHandler = async () => {
    const fetchProfile = async () => {
      const url = userDetail.followExists
        ? `http://localhost:8080/api/followers/unfollow/${userDetail.username}`
        : `http://localhost:8080/api/followers/follow/${userDetail.username}`;
      const response = await fetch(url, {
        method: userDetail.followExists ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUserDetail((prevUserDetail) => {
          return {
            ...prevUserDetail,
            followExists: !prevUserDetail.followExists,
            followers: prevUserDetail.followExists
              ? prevUserDetail.followers - 1
              : prevUserDetail.followers + 1,
          };
        });
        dispatch(resetPosts())
      } else {
        throw new Error(data.message);
      }
    };

    try {
      await fetchProfile();
    } catch (error) {
      return;
    }
  };

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
            <p>
              <strong>Username:</strong> {userDetail.username}
            </p>
            <p>
              <strong>Email:</strong> {userDetail.email}
            </p>
            <p>
              <strong>User Type:</strong> {userDetail.usertype}
            </p>
            <p>
              <strong>Posts: {userDetail.posts.length}</strong>
            </p>
            <p>
              <strong>Followers: {userDetail.followers}</strong>{" "}
            </p>
          </div>
          <div className={styles.mainUserDetailsButtons}>
            {!isLoggedUser && (
              <Fragment>
                <Button
                  clickHandler={followUserButtonHandler}
                  text={userDetail.followExists ? "Unfollow" : "Follow"}
                  additionalStyles={followButonStyles}
                />
                <Button
                  text="Commission"
                  additionalStyles={[styles.profileButton]}
                />
              </Fragment>
            )}
            {isLoggedUser && (
              <Button
                clickHandler={editProfileButtonHandler}
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
        <p>
          <strong>Name:</strong> {userDetail.name}
        </p>
        <p>
          <strong>Location:</strong> {userDetail.location}
        </p>
      </div>
      {userIsArtist && WorksSection}
    </div>
  );
};

export default UserDetail;
