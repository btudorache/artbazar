import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

import styles from './UserDetailPage.module.css'

const UserDetailPage = () => {
  const loggedUsername = useSelector(state => state.auth.username)
  const { urlUsername } = useParams()
  const userDetailName = urlUsername === undefined ? loggedUsername : urlUsername

  return <h1>Profile of {userDetailName}</h1>
}

export default UserDetailPage