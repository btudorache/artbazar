import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useHistory } from "react-router";

import styles from "./RegisterPage.module.css";
import Card from "../components/layout/Card";
import { useFormInput } from "../hooks/useFormInput";
import { useFormPassword } from "../hooks/useFormPassword";

const RegisterPage = () => {
  const history = useHistory()
  const [usernameHasError, validateUsername, usernameRef] = useFormInput(username => username.trim().length !== 0)
  const [emailHasError, validateEmail, emailRef] = useFormInput(email => email.includes("@"))
  const usertypeRef = useRef()
  const [password1Ref, password2Ref, validatePassword, passwordError] = useFormPassword(password => password.trim().length < 4)

  const [backendError, setBackendError] = useState({hasError: false, error: null})

  const formSubmitHandler = async (event) => {
    event.preventDefault()

    if (validatePassword() && validateUsername() && validateEmail()) {
      const newUserData = {
        username: usernameRef.current.value,
        password: password1Ref.current.value,
        type: usertypeRef.current.value,
        email: emailRef.current.value
      }

      try {
        await submitNewUser(newUserData)
        setBackendError({hasError: false, error: null})
        history.push('/')
      } catch (e) {
        setBackendError({hasError: true, error: e.message})
      }
    }
  }

  const submitNewUser = async (newUserData) => {
    const response = await fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserData)
    })

    const data = await response.json()
    if (response.ok) {
      console.log(data)
    } else {
      throw new Error(data.error)
    }
  }

  return (
    <Card>
      <div className={styles.outerForm}>
        <h1>Create a new account</h1>
        {backendError.hasError && <p className="errorText">{backendError.error}</p>}
        <form className={styles.registerForm} onSubmit={formSubmitHandler}>
          <div className={styles.gridRow}>
            <label htmlFor="username">Username: </label>
            <input ref={usernameRef} type="text" id="username" name="username" />
            {usernameHasError && <p className="errorText">Please enter a valid username</p>}
          </div>

          <div className={styles.gridRow}>
            <label htmlFor="Email">Email: </label>
            <input ref={emailRef} type="email" id="Email" name="Email" />
            {emailHasError && <p className="errorText">Please enter a valid email</p>}
          </div>

          <div className={styles.gridRow}>
            <label htmlFor="usertype">Join as:</label>
            <select ref={usertypeRef} className={styles.usertypeInput} name="usertype" id="usertype">
              <option value="ARTIST">Artist</option>
              <option value="EXPLORER">Explorer</option>
            </select>
          </div>

          <div className={styles.gridRow}>
            <label htmlFor="password1">Password: </label>
            <input ref={password1Ref} type="password" id="password1" name="password1" />
            {passwordError.hasError && <p className="errorText">{passwordError.error}</p>}
          </div>

          <div className={styles.gridRow}>
            <label htmlFor="password2">Repeat Password: </label>
            <input ref={password2Ref} type="password" id="password2" name="password2" />
          </div>

          <button className={styles.formButton}>Register</button>
          <Link className={styles.loginLink} to="/login">Already have an account?</Link>
        </form>
      </div>
    </Card>
  );
};

export default RegisterPage;
