import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import styles from "./LoginPage.module.css";
import Card from "../components/layout/general/Card";
import Button from "../components/layout/general/Button";
import { useFormInput } from "../hooks/useFormInput";

import { authenticate } from "../store/authSlice";
import { resetAuthErrorState } from "../store/authSlice";

const LoginPage = () => {
  const backendError = useSelector((state) => {
    return {
      status: state.auth.status,
      error: state.auth.error,
    };
  });

  const dispatch = useDispatch();
  const [usernameHasError, validateUsername, usernameRef] = useFormInput(
    (username) => username.trim().length !== 0
  );
  const [passwordHasError, validatePassword, passwordRef] = useFormInput(
    (password) => password.trim().length >= 4
  );

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const usernameOk = validateUsername();
    const passwordOk = validatePassword();

    if (usernameOk && passwordOk) {
      const userLoginData = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      };

      dispatch(authenticate(userLoginData));
    }
  };

  useEffect(() => {
    return () => {
      if (backendError.status === "failed") {
        dispatch(resetAuthErrorState())
      }
    }
  })

  return (
    <Card>
      <div className={styles.outerForm}>
        <h1>Login to you account</h1>
        {backendError.status === "failed" && (
          <p className="errorText">{backendError.error}</p>
        )}
        <form className={styles.registerForm} onSubmit={submitFormHandler}>
          <div className={styles.gridRow}>
            <label htmlFor="username">Username: </label>
            <input
              ref={usernameRef}
              type="text"
              id="username"
              name="username"
            />
            {usernameHasError && (
              <p className="errorText">Please enter a valid username</p>
            )}
          </div>

          <div className={styles.gridRow}>
            <label htmlFor="password">Password: </label>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              name="password"
            />
            {passwordHasError && (
              <p className="errorText">Please enter a valid password</p>
            )}
          </div>

          <Button text="Login" additionalStyles={[styles.formButton]} />
          <Link className={styles.registerLink} to="/register">
            Don't have an account?
          </Link>
        </form>
      </div>
    </Card>
  );
};

export default LoginPage;
