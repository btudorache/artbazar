import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import styles from './UserProfilePage.module.css'

import { fetchProfile } from "../store/profileSlice";
import LoadingSpinner from "../components/layout/LoadingSpinner";
import UserDetail from "../components/UserDetail";

const UserProfilePage = () => {
  const dispatch = useDispatch()

  const { userDetail, status, error} = useSelector(state => state.profile)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProfile())
    }
  }, [status, dispatch])

  return (
    <div className={styles.mainLayout}>
      {status === "loading" && <LoadingSpinner />}
      {status === "failed" && <p className="errorText">{error}</p>}
      {status === "succeeded" && <UserDetail isLoggedUser={true} userDetail={userDetail} />}
    </div>
  );
}

export default UserProfilePage