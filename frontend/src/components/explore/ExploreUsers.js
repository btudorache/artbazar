import { useRef, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./ExploreUsers.module.css";
import UserPreviewList from "../users/UserPreviewList";
import LoadingSpinner from "../layout/general/LoadingSpinner";

const ExploreUsers = () => {
  const token = useSelector(state => state.auth.token)

  const [users, setUsers] = useState([])
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState(null)

  const searchBarRef = useRef()

  const fetchExploreUsersData = async (queryUsername) => {
    const response = await fetch(`http://localhost:8080/api/users/search?username=${queryUsername}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const users = await response.json();
      return users
    } else {
      throw new Error("Couldn't fetch users")
    }
  }

  const fetchData = async (queryUsername) => {
    try {
      setStatus("loading")
      const users = await fetchExploreUsersData(queryUsername)
      setUsers(users)
      setStatus("succeeded")
    } catch (error) {
      setStatus("failed")
      setError("Couldn't fetch users")
    }
  }

  const searchBarChangeHandler = (event) => {
    event.preventDefault()

    const queryUsername = searchBarRef.current.value
    if (queryUsername.trim().length > 0) {
      fetchData(searchBarRef.current.value)
    }
  }

  return (
    <div className={styles.exploreUsersLayout}>
      <div className={styles.filterUsers}>
        <form className={styles.userSearchForm}>
          <label className={styles.userSearchText} htmlFor="usernameSearched">Search for users</label>
          <input onChange={searchBarChangeHandler} ref={searchBarRef} className={styles.userSearchInput} type="text" id="usernameSearched" name="usernameSearched" />
        </form>
      </div>
      {status === "succeeded" && <UserPreviewList userPreviewList={users} />}
      {status === "succeeded" && users.length === 0 && <p>No users found.</p>}
      {status === "loading" && <LoadingSpinner />}
      {status === 'failed' && <p className="errorText">{error}</p>}
    </div>
  );
};

export default ExploreUsers;
