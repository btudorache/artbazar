import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import styles from "./UserAllPostsPage.module.css";

import LoadingSpinner from "../components/layout/general/LoadingSpinner";
import PostList from "../components/posts/PostList";

const UserAllPostsPage = () => {
  const { urlUsername } = useParams();
  const token = useSelector(state => state.auth.token)

  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState()

  useEffect(() => {
    const fetchAllPosts = async () => {
      const response = await fetch(`http://localhost:8080/api/posts/allposts/${urlUsername}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      const body = await response.json()
      if (response.ok) {
        setPosts(body)
      } else {
        throw new Error(body.message)
      }
    }

    const tryFetching = async () => {
      setStatus("loading")
      try {
        await fetchAllPosts()
        setStatus("succeeded")
      } catch (e) {
        setError(e.message)
        setStatus("failed")
      }
    }

    if (status === "idle") {
      tryFetching()
    }
  }, [token, status, urlUsername, setStatus, setError, setPosts])

  return (
    <div className={styles.allPostPageLayout}>
      <div className={styles.mainSide}>
        {status === "loading" && <LoadingSpinner />}
        {status === "failed" && <p className="errorText">{error}</p>}
        {status === "succeeded" && <PostList posts={posts} listType="SINGLE" />}
      </div>
    </div>
  );
};

export default UserAllPostsPage;
