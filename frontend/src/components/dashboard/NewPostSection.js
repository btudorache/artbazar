import { useRef } from "react";
import { useDispatch } from "react-redux";

import styles from "./NewPostSection.module.css";

import { useFormInput } from "../../hooks/useFormInput";
import { addGeneralPostThunk } from "../../store/dashboardSlice";
import Button from "../layout/general/Button";

const NewPostSection = () => {
  const dispatch = useDispatch()

  const [contentHasError, contentValidate, contentRef] = useFormInput(
    (text) => text.trim().length !== 0 && text.length < 255
  );
  const imageRef = useRef()

  const addContentHandler = (event) => {
    event.preventDefault();

    const contentOk = contentValidate()

    if (contentOk) {
      const formData = new FormData()
      formData.append("type", "GENERAL_POST")
      formData.append("content", contentRef.current.value)

      if (imageRef.current.files.length === 1) {
        formData.append("file", imageRef.current.files[0])
      }

      dispatch(addGeneralPostThunk(formData))
    }
  };

  return (
    <div className={styles.addPostSection}>
      <p className={styles.addPostParagraph}>Add a new post</p>
      <form onSubmit={addContentHandler}>
        <textarea
          className={styles.contentInput}
          ref={contentRef}
          type="text"
          id="text"
          name="text"
        />
        {contentHasError && (
          <p className="errorText">
            Please enter valid text (no empty text or more than 255 characters)
          </p>
        )}
        <label className={styles.imageLabel} htmlFor="image">Add an image to your post</label>
        <input ref={imageRef} type="file" id="image" name="image" />
        <Button text="Add Post" additionalStyles={[styles.addPostButton]}/>
      </form>
    </div>
  );
};

export default NewPostSection;
