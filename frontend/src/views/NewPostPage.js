import { useFormInput } from '../hooks/useFormInput'

import styles from './NewPostPage.module.css'

import Card from '../components/layout/Card'
import Button from '../components/Button'

const notEmptyFieldValidator = string => string.trim().length !== 0

const NewPostPage = () => {
  const [categoryHasError, validateCategory, categoryRef] = useFormInput(notEmptyFieldValidator)
  const [descriptionHasError, validateDescription, descriptionRef] = useFormInput(notEmptyFieldValidator)

  const formSubmitHandler = (event) => {
    event.preventDefault()

    const categoryOk = validateCategory()
    const descriptionOk = validateDescription()

    if (categoryOk && descriptionOk) {
      console.log('post submited')
    }
  }

  return <Card>
    <div className={styles.outerForm}>
      <h1>Add a new art piece</h1>
      <form className={styles.registerForm} onSubmit={formSubmitHandler}>
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
        <Button text="Add" />
      </form>
    </div>
  </Card>
}

export default NewPostPage