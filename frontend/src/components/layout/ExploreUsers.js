import { Fragment, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./ExploreUsers.module.css";
import { fetchExploreUsers } from "../../store/exploreSlice";
import UserPreviewList from "../UserPreviewList";
import Button from "../Button";

const ExploreUsers = () => {
  const dispatch = useDispatch()
  const { users, usersStatus, usersError } = useSelector(state => state.explore)

  const searchBarRef = useRef()

  const searchUserFormHandler = (event) => {
    event.preventDefault()
    
    dispatch(fetchExploreUsers(searchBarRef.current.value))
  }

  console.log(users)

  return (
    <Fragment>
      <div className={styles.filterUsers}>
        <form onSubmit={searchUserFormHandler} className={styles.userSearchForm}>
          <label className={styles.userSearchText} htmlFor="usernameSearched">Search for users</label>
          <div className={styles.userSearchBar}>
            <input ref={searchBarRef} className={styles.userSearchInput} type="text" id="usernameSearched" name="usernameSearched" />
            <Button text="Search"/>
          </div>
        </form>
      </div>
      {usersStatus === "succeeded" && <UserPreviewList userPreviewList={users} />}
      {usersStatus === "succeeded" && users.length === 0 && <p>No users found.</p>}
      {usersStatus === "loading" && <p>Loading...</p>}
      {usersStatus === 'failed' && <p className="errorText">{usersError}</p>}
    </Fragment>
  );
};

export default ExploreUsers;
