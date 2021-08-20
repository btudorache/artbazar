import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import styles from './LogoutPage.module.css'

import Card from '../components/layout/Card'

import { logoutThunk } from '../store/authSlice'

const LogoutPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleClick = () => {
    dispatch(logoutThunk())
    history.push("/")
  }

  return <Card>
    <h1>You are sure you want to logout?</h1>
    <button onClick={handleClick}>Leave</button>
  </Card>
}

export default LogoutPage