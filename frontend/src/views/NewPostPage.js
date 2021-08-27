import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import styles from './NewPostPage.module.css'
import { useFormInput } from '../hooks/useFormInput'
import { addPostAsync } from '../store/postsSlice'
import Card from '../components/layout/Card'
import Button from '../components/Button'

const notEmptyFieldValidator = string => string.trim().length !== 0

const NewPostPage = () => {
  const [categoryHasError, validateCategory, categoryRef] = useFormInput(notEmptyFieldValidator)
  const [descriptionHasError, validateDescription, descriptionRef] = useFormInput(notEmptyFieldValidator)
  const [titleHasError, validateTitle, titleRef] = useFormInput(notEmptyFieldValidator)
  const [imageHasError, validateImage, imageRef] = useFormInput(notEmptyFieldValidator)
  const dispatch = useDispatch()
  const history = useHistory()

  const formSubmitHandler = (event) => {
    event.preventDefault()

    const categoryOk = validateCategory()
    const descriptionOk = validateDescription()
    const titleOk = validateTitle()
    const imageOk = validateImage()

    if (categoryOk && descriptionOk && titleOk && imageOk) {
      const form = new FormData()
      form.append("file", imageRef.current.files[0])
      form.append("title", titleRef.current.value)
      form.append("category", categoryRef.current.value)
      form.append("description", descriptionRef.current.value)

      dispatch(addPostAsync(form))
      history.push("/profile")
    }
  }

  return <Card>
    <div className={styles.outerForm}>
      <h1>Add a new art piece</h1>
      <form className={styles.registerForm} onSubmit={formSubmitHandler}>
        <div className={styles.gridRow}>
          <label htmlFor="title">Title</label>
          <input ref={titleRef}  type="text" id="title" name="title"/>
          {titleHasError && <p className="errorText">Title is empty!</p>}
        </div>
        <div className={styles.gridRow}>
          <label htmlFor="category">Category</label>
          <input ref={categoryRef}  type="text" id="category" name="category"/>
          {categoryHasError && <p className="errorText">Category is empty!</p>}
        </div>
        <div className={styles.gridRow}>
          <label htmlFor="description">Description</label>
          <input ref={descriptionRef} type="text" id="description" name="description" />
          {descriptionHasError && <p className="errorText">Description is empty!</p>}
        </div>
        <div className={styles.gridRow}>
          <label htmlFor="image">Add a piece of art</label>
          <input ref={imageRef} type="file" id="image" name="image" />
          {imageHasError && <p className="errorText">Image is empty!</p>}
        </div>
        <Button text="Add" />
      </form>
    </div>
  </Card>
}

export default NewPostPage