import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";

import styles from "./UserEditPage.module.css";

import { editProfileThunk, fetchProfile } from "../store/profileSlice";
import { useFormInput } from "../hooks/useFormInput";
import Card from "../components/layout/general/Card";
import Button from "../components/layout/general/Button"

const stringLowerThan255 = (string) => string.length < 255;

const UserEditPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [nameHasError, validateName, nameRef] = useFormInput(stringLowerThan255);
  const [locationHasError, validateLocation, locationRef] = useFormInput(stringLowerThan255)
  const [descriptionHasError, validateDescription, descriptionRef] = useFormInput(stringLowerThan255);
  const imageRef = useRef()

  const StringLowerThan255Error = <p className="errorText">Text must have less than 255 characters!</p>

  const profileStatus = useSelector(state => state.profile.status)

  useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(fetchProfile())
    }
  }, [profileStatus, dispatch])

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

      if (imageRef.current.files.length === 1) {
        profileForm.append("image", imageRef.current.files[0])
      }

      dispatch(editProfileThunk(profileForm));

      // switch pages after 200ms for the database to have
      // time to upload the new profile image
      setTimeout(() => history.push("/profile"), 200)
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
          <div className={styles.gridRow}>
            <label htmlFor="image">Change profile image</label>
            <input ref={imageRef} type="file" id="image" name="image" />
          </div>
          <Button text="Edit Profile" />
        </form>
      </div>
    </Card>
  );
};

export default UserEditPage;
