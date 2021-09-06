import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import styles from "./UserDetailPage.module.css";

import UserDetail from "../components/UserDetail";

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

  return (
    <div className={styles.mainLayout}>
      {isLoading && <p>Loading...</p>}
      {fetchError && <p className="errorText">{fetchError}</p>}
      {userDetail && <UserDetail isLoggedUser={isLoggedUser} userDetail={userDetail} />}
    </div>
  );
};

export default UserDetailPage;
