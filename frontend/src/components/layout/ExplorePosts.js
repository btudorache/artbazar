import { useSelector, useDispatch } from 'react-redux'
import { useEffect, Fragment } from 'react'

import styles from './ExplorePosts.module.css'
import PostList from '../PostList'

import { fetchExplorePosts } from '../../store/exploreSlice'

const ExplorePosts = () => {
  const {posts, postsStatus, postsError} = useSelector(state => state.explore)
  const dispatch = useDispatch()

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchExplorePosts())
    }
  }, [dispatch, postsStatus])

  return <Fragment>
    <div className={styles.filterPosts}>
      <p>Filter posts bar</p>
    </div>
    {postsStatus === "succeeded" && <PostList posts={posts} />}
    {postsStatus === "succeeded" && posts.length === 0 && <p>No posts found.</p>}
    {postsStatus === "loading" && <p>Loading...</p>}
    {postsStatus === 'failed' && <p className="errorText">{postsError}</p>}
  </Fragment>
}

export default ExplorePosts