import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import styles from "./NewPostPage.module.css";
import { useFormInput } from "../hooks/useFormInput";
import { addPostAsync } from "../store/profileSlice";
import Card from "../components/layout/general/Card";
import Button from "../components/layout/general/Button";

const notEmptyFieldValidator = (string) => string.trim().length !== 0;

const NewPostPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [categoryHasError, validateCategory, categoryRef] = useFormInput(
    (category) => category.trim() !== "UNSELECTED"
  );
  const [descriptionHasError, validateDescription, descriptionRef] =
    useFormInput((text) => text.trim().length !== 0 && text.length < 255);
  const [titleHasError, validateTitle, titleRef] = useFormInput(
    notEmptyFieldValidator
  );
  const [imageHasError, validateImage, imageRef] = useFormInput(
    notEmptyFieldValidator
  );

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const categoryOk = validateCategory();
    const descriptionOk = validateDescription();
    const titleOk = validateTitle();
    const imageOk = validateImage();

    if (categoryOk && descriptionOk && titleOk && imageOk) {
      const form = new FormData();

      form.append("type", "ART_POST")
      form.append("file", imageRef.current.files[0]);
      form.append("title", titleRef.current.value);
      form.append("category", categoryRef.current.value);
      form.append("description", descriptionRef.current.value);

      dispatch(addPostAsync(form));
      history.push("/profile");
    }
  };

  return (
    <Card>
      <div className={styles.outerForm}>
        <h1>Add a new art piece</h1>
        <form className={styles.registerForm} onSubmit={formSubmitHandler}>
          <div className={styles.gridRow}>
            <label htmlFor="title">Title</label>
            <input ref={titleRef} type="text" id="title" name="title" />
            {titleHasError && <p className="errorText">Title is empty!</p>}
          </div>
          <div className={styles.gridRow}>
            <label htmlFor="category">Category</label>
            <select
              defaultValue="UNSELECTED"
              className={styles.categoryInput}
              ref={categoryRef}
              name="category"
              id="category"
            >
              <option
                value="UNSELECTED"
                className={styles.disabledOption}
                disabled
              >
                -- select an option --
              </option>
              <option value="PAINTING">Painting</option>
              <option value="CRAFTS">Crafts</option>
              <option value="DIGITAL">Digital</option>
              <option value="DRAWING">Drawing</option>
              <option value="PHOTOGRAPHY">Photography</option>
            </select>
            {categoryHasError && <p className="errorText">Choose a category</p>}
          </div>
          <div className={styles.gridRow}>
            <label htmlFor="description">Description</label>
            <input
              ref={descriptionRef}
              type="text"
              id="description"
              name="description"
            />
            {descriptionHasError && (
              <p className="errorText">
                Invalid description! (no empty text or more than 255 characters)
              </p>
            )}
          </div>
          <div className={styles.gridRow}>
            <label>Add a piece of art</label>
            <label className={styles.defaultButtonStyle} htmlFor="image-input">Add image</label>
            <input ref={imageRef} type="file" id="image-input" name="image" />
            {imageHasError && <p className="errorText">Image is empty!</p>}
          </div>
          <Button text="Add" />
        </form>
      </div>
    </Card>
  );
};

export default NewPostPage;
