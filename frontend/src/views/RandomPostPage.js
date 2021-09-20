import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import styles from './RandomPostPage.module.css'

import PostDetail from "../components/posts/PostDetail";
import Button from "../components/layout/general/Button";
import LoadingSpinner from "../components/layout/general/LoadingSpinner";

const RandomPostPage = () => {
  const token = useSelector((state) => state.auth.token);

  const [status, setStatus] = useState("idle");
  const [postDetail, setPostDetail] = useState(null);
  const [error, setError] = useState(null);

  const tryAnotherButtonClickHandler = () => {
    setStatus("idle")
  }

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        `http://localhost:8080/api/posts/random`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const postData = await response.json();
      if (response.ok) {
        setPostDetail(postData);
      } else {
        throw new Error(postData.message);
      }
    };

    const tryFetch = async () => {
      setStatus("loading")
      try {
        await fetchPost();
        setStatus("succeeded");
      } catch (error) {
        setStatus("failed")
        setError(error.message);
      }
    };

    if (status === "idle") {
      tryFetch();
    }
  }, [status, token, setError, setStatus]);

  return (
    <div className={styles.randomPostPageLayout}>
      <Button additionalStyles={[styles.tryAnotherButton]} text="Try Another" clickHandler={tryAnotherButtonClickHandler}/>
      {status === "loading" && <LoadingSpinner />}
      {status === "failed" && <p className="errorText">{error}</p>}
      {status === "succeeded" && <PostDetail postDetail={postDetail} setPostDetail={setPostDetail}/>}
    </div>
  );
}

export default RandomPostPage