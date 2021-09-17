import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDashboardPosts } from '../../store/dashboardSlice'

import styles from './Dashboard.module.css'

import LoadingSpinner from './LoadingSpinner'
import Post from '../Post'

const Dashboard = () => {
  const {posts, status, error} = useSelector(state => state.dashboard)
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDashboardPosts())
    }
  }, [dispatch, status])

  return <div className={styles.mainLayout}>
    <div className={styles.actionSide}>
      <h2>Action Bar</h2>
    </div>
    <div className={styles.mainSide}>
      {status === "succeeded" && posts.length === 0 && <p>No posts currently. Go to Explore and find some artists you like!</p>}
      <ul className={styles.postList}>
        {posts.map(postData => <li key={postData.id}><Post postData={postData} /></li>)}
      </ul>
      {status === "loading" && <LoadingSpinner />}
      {status === 'failed' && <p className="errorText">{error}</p>}
    </div>
    <div className={styles.secondarySide}>

    </div>
  </div>
}

export default Dashboard