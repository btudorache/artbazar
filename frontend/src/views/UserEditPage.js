import styles from "./UserEditPage.module.css";
import { useFormInput } from "../hooks/useFormInput";
import Card from "../components/layout/Card";

const noFieldValidator = (string) => true;

const UserEditPage = () => {
  const [nameHasError, validateName, nameRef] = useFormInput(noFieldValidator);
  const [locationHasError, validateLocation, locationRef] =
    useFormInput(noFieldValidator);

  const formSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Card>
      <div className={styles.userEditPageLayout}>
        <h1>Edit Profile</h1>
        <form className={styles.registerForm} onSubmit={formSubmitHandler}>
          <div className={styles.gridRow}>
            <label htmlFor="Name">Title</label>
            <input ref={nameRef} type="text" id="name" name="name" />
          </div>
          <div className={styles.gridRow}>
            <label htmlFor="location">Location</label>
            <input ref={locationRef} type="text" id="location" name="location" />
          </div>
        </form>
      </div>
    </Card>
  );
};

export default UserEditPage;
