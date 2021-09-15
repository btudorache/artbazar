import { useSelector, useDispatch } from 'react-redux'
import { useEffect, Fragment } from 'react'

import styles from './ExplorePosts.module.css'
import PostList from '../PostList'

import { fetchExplorePosts } from '../../store/exploreSlice'

const ExplorePosts = () => {
  const {posts, status, error} = useSelector(state => state.explore)
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchExplorePosts())
    }
  }, [dispatch, status])

  return <Fragment>
    <div className={styles.filterPosts}>
      <p>Filter posts bar</p>
    </div>
    {status === "succeeded" && <PostList posts={posts} />}
    {status === "loading" && <p>Loading...</p>}
    {status === 'failed' && <p className="errorText">{error}</p>}
  </Fragment>
}

export default ExplorePosts