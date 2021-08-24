import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import styles from "./HomePage.module.css";
import Button from "../components/Button";
import Dashboard from "../components/layout/Dashboard";

const HomePage = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const history = useHistory();

  const loginButtonHandler = () => {
    history.push("/login");
  };

  const registerButtonHandler = () => {
    history.push("/register");
  };

  const loggedOutPage = (
    <div className={styles.welcomePageDiv}>
      <div>
        <h1>ArtBazar - keeping creatives and their audience close</h1>
        <p>
          We are a social app destined for artists to facilitate comunication
          between them and their fanbase. Join us if you feel like you have
          something to share to the world!
        </p>
        <p>Join as an <strong>Artist</strong> to share your work, or join as an <strong>Explorer</strong> to promote your favorite art!</p>
      </div>

      <div className={styles.lineDiv}></div>

      <div className={styles.welcomePageButtons}>
        <p>Join us now!</p>
        <Button
          clickHandler={registerButtonHandler}
          additionalStyles={[styles.welcomePageButton]}
          text="Join"
        />
        <Button
          clickHandler={loginButtonHandler}
          additionalStyles={[styles.welcomePageButton]}
          text="Login"
        />
      </div>
    </div>
  );

  return (
    <Fragment>
      {isLogged && <Dashboard />}
      {!isLogged && loggedOutPage}
    </Fragment>
  );
};

export default HomePage;
