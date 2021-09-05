import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import styles from "./UserDetailPage.module.css";

import Button from "../components/Button";
import Post from "../components/Post";

const UserDetailPage = ({ isLoggedUser }) => {
  const { loggedUsername, token } = useSelector((state) => {
    return {
      loggedUsername: state.auth.username,
      token: state.auth.token,
    };
  });
  const { urlUsername } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const userDetailName = isLoggedUser ? loggedUsername : urlUsername;

  useEffect(() => {
    const fetchPost = async (username) => {
      const response = await fetch(
        `http://localhost:8080/api/users/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const postData = await response.json();
      if (response.ok) {
        setUserDetail(postData);
      } else {
        throw new Error(postData.message);
      }
    };

    const tryFetch = async () => {
      setIsLoading(true);
      try {
        await fetchPost(userDetailName);
      } catch (error) {
        setFetchError(error.message);
      }
      setIsLoading(false);
    };
    tryFetch();
  }, [userDetailName, token, setFetchError, setIsLoading]);

  const userDataJSX =
    userDetail === null ? null : (
      <Fragment>
        <div className={styles.mainUserDetailsSection}>
          <div className={styles.userImageDiv}>
            <img
              className={styles.userImage}
              src={userDetail.profileImageUrl}
            />
          </div>
          <div className={styles.mainUserDetailsInfo}>
            <div className={styles.mainUserDetailsInfoList}>
              <h2>Account Information</h2>
              <p>Username: {userDetail.username}</p>
              <p>Email: {userDetail.email}</p>
              <p>User Type: {userDetail.usertype}</p>
              <p>Join Date: </p>
              <p>Followers: </p>
            </div>
            <div className={styles.mainUserDetailsButtons}>
              <Button text="Follow" additionalStyles={[styles.profileButton]} />
              <Button
                text="Commission"
                additionalStyles={[styles.profileButton]}
              />
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
          <p>First Name: {userDetail.firstname}</p>
          <p>Last Name: {userDetail.lastname}</p>
          <p>Location: {userDetail.location}</p>
        </div>
        <div className={styles.sectionDelimiter} />
        <div className={styles.userPostsSection}>
          <h2>Works</h2>
          <ul className={styles.userPostsGrid}>
            {userDetail.posts.map(postData => <li key={postData.id}><Post postData={postData} /></li>)}
          </ul>
        </div>
      </Fragment>
    );

  return (
    <div className={styles.mainLayout}>
      {isLoading && <p>Loading...</p>}
      {fetchError && <p>{fetchError}</p>}
      {!isLoading && !fetchError && userDataJSX}
    </div>
  );
};

export default UserDetailPage;
