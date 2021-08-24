import styles from './Dashboard.module.css'

import Post from '../Post'

const Dashboard = () => {
  return <div className={styles.mainLayout}>
    <div className={styles.actionSide}>
      <h2>Action Bar</h2>
    </div>
    <div className={styles.mainSide}>
      <Post />
      <Post />
      <Post />
    </div>
    <div className={styles.secondarySide}>

    </div>
  </div>
}

export default Dashboard