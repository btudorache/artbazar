import { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./PostDetail.module.css";
import { useFormInput } from "../hooks/useFormInput";
import Post from "./Post";
import Comment from "./Comment";
import Button from "./Button";

const PostDetail = ({ postDetail, setPostDetail }) => {
  const token = useSelector(state => state.auth.token)
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentHasError, commentValidate, commentRef] = useFormInput(
    (text) => text.trim().length !== 0 && text.length < 255
  );

  const addCommentToBackend = async (commentForm) => {
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

  const addCommentHandler = async (event) => {
    event.preventDefault()

    const commentOk = commentValidate()

    if (commentOk) {
      const commentForm = new FormData()
      commentForm.append("text", commentRef.current.value)
      commentForm.append("post_id", postDetail.postData.id)
      try {
        await addCommentToBackend(commentForm)
      } catch(error) {
        console.log(error.message)
      }
      commentRef.current.value = ""
    }
  }

  return (
    <div className={styles.mainDiv}>
      <Post isDetail postData={postDetail.postData} />
      {!showCommentBox && (
        <div className={styles.showCommentBox}>
          <h4
            className={styles.showCommentBoxText}
            onClick={() => setShowCommentBox(true)}
          >
            Want to add a comment?
          </h4>
        </div>
      )}
      {showCommentBox && (
        <div className={styles.commentBox}>
          <p>Add a comment</p>
          <form onSubmit={addCommentHandler}>
            <textarea
              className={styles.commentInput}
              ref={commentRef}
              type="text"
              id="text"
              name="text"
            />
            {commentHasError && (
              <p className="errorText">
                Please enter valid text (no empty text or more than 255
                characters)
              </p>
            )}
            <Button text="Comment" additionalStyles={[styles.commentButton]} />
          </form>
        </div>
      )}
      {postDetail.comments.length === 0 && <p>No comments currently.</p>}
      <ul className={styles.commentList}>
        {postDetail.comments.map((comment) => (
          <li key={comment.id}>
            <Comment commentData={comment} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetail;
