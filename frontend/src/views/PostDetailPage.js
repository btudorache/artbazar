import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import PostDetail from "../components/PostDetail";

import styles from "./PostDetailPage.module.css";

const PostDetailPage = () => {
  const token = useSelector((state) => state.auth.token);
  const { postId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [postDetail, setPostDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async (postId) => {
      const response = await fetch(
        `http://localhost:8080/api/posts/${postId}`,
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
      setIsLoading(true)
      try {
        await fetchPost(+postId);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    tryFetch();
  }, [postId, token, setError, setIsLoading]);

  return (
    <div className={styles.postDetailPageDiv}>
      {isLoading && <p>Loading...</p>}
      {error && <p className="errorText">{error}</p>}
      {postDetail && <PostDetail postDetail={postDetail} setPostDetail={setPostDetail}/>}
    </div>
  );
};

export default PostDetailPage;
