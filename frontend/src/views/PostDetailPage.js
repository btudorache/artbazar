import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import Post from "../components/Post";
import Button from "../components/Button";
import { useFormInput } from "../hooks/useFormInput";

import styles from "./PostDetailPage.module.css";

const PostDetailPage = () => {
  const token = useSelector((state) => state.auth.token);
  const { postId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [postDetail, setPostDetail] = useState(null);
  const [error, setError] = useState(null);

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentHasError, commentValidate, commentRef] = useFormInput(
    (text) => text.trim().length !== 0
  );

  const addPostHandler = (event) => {
    event.preventDefault()

    const commentOk = commentValidate()

    if (commentOk) {
      console.log(commentRef.current.value)
    }
  }

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
      try {
        await fetchPost(+postId);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    tryFetch();
  }, [postId, token, setError, setIsLoading]);

  // const postDetail = posts.find((post) => post.id === +postId);
  const loadedData = (
    <Fragment>
      <Post isDetail postData={postDetail} />
      {!showCommentBox && (
        <div className={styles.showCommentBox}>
          <h4 className={styles.showCommentBoxText} onClick={() => setShowCommentBox(true)}>Want to add a comment?</h4>
        </div>
      )}
      {showCommentBox && (
        <div className={styles.commentBox}>
          <p>Add a comment</p>
          <form onSubmit={addPostHandler}>
            <textarea className={styles.commentInput} ref={commentRef} type="text" id="text" name="text" />
            {commentHasError && (
              <p className="errorText">Please valid text</p>
            )}
            <Button text="Comment" />
          </form>
        </div>
      )}
      <div>
          <p>Comments</p>
        </div>
    </Fragment>
  );

  return (
    <div className={styles.postDetail}>
      {isLoading && <p>Loading...</p>}
      {error && <p className="errorText">{error}</p>}
      {!isLoading && !error && loadedData}
    </div>
  );
};

export default PostDetailPage;
