import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import Post from "../components/Post";
import Button from "../components/Button";
import Comment from "../components/Comment";
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

  const addPostFetch = async (commentForm) => {
    const response = await fetch("http://localhost:8080/api/comments", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: commentForm
    })

    if (response.ok) {
      const data = await response.json()
      setPostDetail(prevPostDetail => {
        return {
          postData: prevPostDetail.postData,
          comments: [data].concat(prevPostDetail.comments)
        }
      })
      // setShowCommentBox(false)
    } else {
      throw new Error("Couldn't add comment")
    }
  }

  const addPostHandler = async (event) => {
    event.preventDefault()

    const commentOk = commentValidate()

    if (commentOk) {
      const commentForm = new FormData()
      commentForm.append("text", commentRef.current.value)
      commentForm.append("post_id", +postId)
      try {
        await addPostFetch(commentForm)
      } catch(error) {
        console.log(error.message)
      }
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

  const loadedData = postDetail == null ? null :
    <Fragment>
      <Post isDetail postData={postDetail.postData} />
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
      <ul className={styles.commentList}>
        {postDetail.comments.map(comment => <li key={comment.id}><Comment commentData={comment} /></li>)}
      </ul>
    </Fragment>

  return (
    <div className={styles.postDetail}>
      {isLoading && <p>Loading...</p>}
      {error && <p className="errorText">{error}</p>}
      {!isLoading && !error && loadedData}
    </div>
  );
};

export default PostDetailPage;
