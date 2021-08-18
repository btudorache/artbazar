import { Link } from "react-router-dom";

import styles from "./RegisterPage.module.css";
import Card from "../components/layout/Card";

const RegisterPage = () => {
  return (
    <Card>
      <div className={styles.outerForm}>
        <h1>Create a new account</h1>
        <form className={styles.registerForm}>
          <div className={styles.gridRow}>
            <label htmlFor="username">Username: </label>
            <input type="text" id="username" name="username" />
          </div>

          <div className={styles.gridRow}>
            <label htmlFor="Email">Email: </label>
            <input type="email" id="Email" name="Email" />
          </div>

          <div className={styles.gridRow}>
            <label htmlFor="usertype">Join as:</label>
            <select className={styles.usertypeInput} name="usertype" id="usertype">
              <option value="ARTIST">Artist</option>
              <option value="EXPLORER">Explorer</option>
            </select>
          </div>

          <div className={styles.gridRow}>
            <label htmlFor="password1">Password: </label>
            <input type="password" id="password1" name="password1" />
          </div>

          <div className={styles.gridRow}>
            <label htmlFor="password2">Repeat Password: </label>
            <input type="password" id="password2" name="password2" />
          </div>

          <button className={styles.formButton}>Register</button>
          <Link className={styles.loginLink} to="/login">Already have an account?</Link>
        </form>
      </div>
    </Card>
  );
};

export default RegisterPage;
