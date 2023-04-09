import styles from "./PostList.module.css";

import Post from "./Post";

const PostList = ({ posts, listType }) => {
  return (
    <>
      <ul
        className={
          listType === "SINGLE" ? styles.postListSingle : styles.postListDouble
        }
      >
        {posts.map((postData) => (
          <li className={styles.listElem} key={postData.id}>
            {listType === "SINGLE" ? (
              <Post postData={postData} isOnDashboard />
            ) : (
              <Post postData={postData} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostList;
