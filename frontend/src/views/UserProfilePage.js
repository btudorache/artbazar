import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import styles from './UserProfilePage.module.css'

import { fetchProfile } from "../store/profileSlice";
import UserDetail from "../components/UserDetail";

const UserProfilePage = () => {
  const dispatch = useDispatch()

  const username = useSelector(state => state.auth.username);
  const { userDetail, status, error} = useSelector(state => state.profile)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProfile(username))
    }
  }, [status, dispatch, username])

  return (
    <div className={styles.mainLayout}>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p className="errorText">{error}</p>}
      {status === "succeeded" && <UserDetail isLoggedUser={true} userDetail={userDetail} />}
    </div>
  );
}

export default UserProfilePage