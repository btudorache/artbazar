import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import styles from "./UserDetailPage.module.css";

import LoadingSpinner from "../components/layout/general/LoadingSpinner";
import UserDetail from "../components/users/UserDetail";

const UserDetailPage = () => {
  const { urlUsername } = useParams();
  const token = useSelector((state) => state.auth.token);

  const [userDetail, setUserDetail] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(
        `http://localhost:8080/api/users/${urlUsername}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUserDetail(data);
      } else {
        throw new Error(data.message);
      }
    };

    const tryFetching = async () => {
      setStatus("loading");
      try {
        await fetchProfile();
        setStatus("succeeded");
      } catch (error) {
        setError(error.message);
        setStatus("failed");
      }
    };

    tryFetching();
  }, [token, urlUsername, setUserDetail, setStatus, setError]);

  return (
    <div className={styles.mainLayout}>
      {status === "loading" && <LoadingSpinner />}
      {status === "failed" && <p className="errorText">{error}</p>}
      {status === "succeeded" && (
        <UserDetail
          isLoggedUser={false}
          userDetail={userDetail}
          setUserDetail={setUserDetail}
        />
      )}
    </div>
  );
};

export default UserDetailPage;
