import styles from "./PostList.module.css";

import Post from "./Post";

const PostList = ({ posts }) => {
  return (
    <ul className={styles.postList}>
      {posts.map((postData) => (
        <li key={postData.id}>
          <Post postData={postData} />
        </li>
      ))}
    </ul>
  );
};

export default PostList;
