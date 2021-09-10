import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

import styles from "./UserEditPage.module.css";

import { editProfileThunk } from "../store/profileSlice";
import { useFormInput } from "../hooks/useFormInput";
import Card from "../components/layout/Card";
import Button from "../components/Button"

const stringLowerThan255 = (string) => string.length < 255;

const UserEditPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [nameHasError, validateName, nameRef] = useFormInput(stringLowerThan255);
  const [locationHasError, validateLocation, locationRef] = useFormInput(stringLowerThan255)
  const [descriptionHasError, validateDescription, descriptionRef] = useFormInput(stringLowerThan255);

  const StringLowerThan255Error = <p className="errorText">Text must have less than 255 characters!</p>

  const backTextHandler = () => {
    history.goBack()
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const nameOk = validateName()
    const locationOk = validateLocation()
    const descriptionOk = validateDescription()

    if (nameOk && locationOk && descriptionOk) {
      const profileForm = new FormData();
      profileForm.append("name", nameRef.current.value);
      profileForm.append("location", locationRef.current.value);
      profileForm.append("description", descriptionRef.current.value);

      dispatch(editProfileThunk(profileForm));
      history.push("/profile")
    }
  };

  return (
    <Card>
      <p onClick={backTextHandler} className={styles.goBackText}>Go back to profile</p>
      <div className={styles.userEditPageLayout}>
        <h1>Edit Profile</h1>
        <form className={styles.registerForm} onSubmit={formSubmitHandler}>
          <div className={styles.gridRow}>
            <label htmlFor="Name">Name</label>
            <input ref={nameRef} type="text" id="name" name="name" />
            {nameHasError && StringLowerThan255Error}
          </div>
          <div className={styles.gridRow}>
            <label htmlFor="location">Location</label>
            <input ref={locationRef} type="text" id="location" name="location" />
            {locationHasError && StringLowerThan255Error}
          </div>
          <div className={styles.gridRow}>
            <label htmlFor="description">Description</label>
            <input ref={descriptionRef} type="text" id="description" name="description" />
            {descriptionHasError && StringLowerThan255Error}
          </div>
          <Button text="Edit Profile" />
        </form>
      </div>
    </Card>
  );
};

export default UserEditPage;
