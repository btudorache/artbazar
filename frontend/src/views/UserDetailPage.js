import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import styles from "./UserDetailPage.module.css";

import { fetchProfile } from "../store/profileSlice";
import UserDetail from "../components/UserDetail";

const UserDetailPage = ({ isLoggedUser }) => {
  const dispatch = useDispatch()

  const username = useSelector(state => state.auth.username);
  const { userDetail, status, error} = useSelector(state => state.profile)
  const { urlUsername } = useParams();

  const userDetailName = isLoggedUser ? username : urlUsername;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProfile(userDetailName))
    }
  }, [status, dispatch, userDetailName])

  return (
    <div className={styles.mainLayout}>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p className="errorText">{error}</p>}
      {status === "succeeded" && <UserDetail isLoggedUser={isLoggedUser} userDetail={userDetail} />}
    </div>
  );
};

export default UserDetailPage;
