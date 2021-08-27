import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../../store/postsSlice'

import styles from './Dashboard.module.css'

import Post from '../Post'

const Dashboard = () => {
  const {posts, status, error} = useSelector(state => state.posts)
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts())
    }
  }, [dispatch, status])

  return <div className={styles.mainLayout}>
    <div className={styles.actionSide}>
      <h2>Action Bar</h2>
    </div>
    <div className={styles.mainSide}>
      {status === "loading" && <p>Loading...</p>}
      {status === 'failed' && <p className="errorText">{error}</p>}
      {posts.map(postData => <Post key={postData.id} postData={postData} />)}
    </div>
    <div className={styles.secondarySide}>

    </div>
  </div>
}

export default Dashboard