import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useHistory } from 'react-router'

import styles from './LoginPage.module.css'
import Card from '../components/layout/Card'
import { useFormInput } from '../hooks/useFormInput'

const LoginPage = () => {
  const history = useHistory()
  const [usernameHasError, validateUsername, usernameRef] = useFormInput(username => username.trim().length !== 0)
  const [passwordHasError, validatePassword, passwordRef] = useFormInput(password => password.trim().length >= 4)

  const [backendError, setBackendError] = useState({hasError: false, error: null})

  const submitFormHandler = async (event) => {
    event.preventDefault()

    const usernameOk = validateUsername()
    const passwordOk = validatePassword()

    if (usernameOk && passwordOk) {
      const userLoginData = {
        username: usernameRef.current.value,
        password: passwordRef.current.value
      }


      try {
        await authenticate(userLoginData)
        // TODO: set the global state as authenticated
        setBackendError({hasError: false, error: null})
        history.push('/')
      } catch (e) {
        setBackendError({hasError: true, error: e.message})
      }
    }
  }

  const authenticate = async (userLoginData) => {
    const response = await fetch("http://localhost:8080/api/login/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userLoginData)
    })

    const data = await response.json()
    if (response.ok) {
      console.log(data)
    } else {
      throw new Error(data.error)
    }
  }

  return <Card>
    <div className={styles.outerForm}>
      <h1>Login to you account</h1>
      {backendError.hasError && <p className="errorText">{backendError.error}</p>}
      <form className={styles.registerForm} onSubmit={submitFormHandler}>
        <div className={styles.gridRow}>
          <label htmlFor="username">Username: </label>
          <input ref={usernameRef} type="text" id="username" name="username" />
          {usernameHasError && <p className="errorText">Please enter a valid username</p>}
        </div>

        <div className={styles.gridRow}>
          <label htmlFor="password">Password: </label>
          <input ref={passwordRef} type="text" id="password" name="password" />
          {passwordHasError && <p className="errorText">Please enter a valid password</p>}
        </div>

        <button className={styles.formButton}>Login</button>
        <Link className={styles.registerLink} to="/register">Don't have an account?</Link>
      </form>
    </div>
  </Card>
}

export default LoginPage