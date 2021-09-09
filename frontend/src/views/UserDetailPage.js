import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import styles from "./UserDetailPage.module.css";

import UserDetail from "../components/UserDetail";

const UserDetailPage = () => {
  const dispatch = useDispatch()
  const { urlUsername } = useParams();
  const token = useSelector(state => state.auth.token)

  const [userDetail, setUserDetail] = useState(null)
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`http://localhost:8080/api/users/${urlUsername}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      if (response.ok) {
        setUserDetail(data)
      } else {
        throw new Error(data.message)
      }
    }

    const tryFetching = async () => {
      setIsLoading(true)
      try {
        await fetchProfile()
      } catch (error) {
        setError(error.message)
      }
      setIsLoading(false)
    }

    tryFetching()
  }, [dispatch, token, setUserDetail, setIsLoading, setError])

  return (
    <div className={styles.mainLayout}>
      {isLoading && <p>Loading...</p>}
      {error && <p className="errorText">{error}</p>}
      {userDetail && <UserDetail isLoggedUser={false} userDetail={userDetail} />}
    </div>
  );
};

export default UserDetailPage;
