import styles from "./PostList.module.css";

import Post from "./Post";

const PostList = ({ posts, listType }) => {
  var listTypeStyle
  if (listType === "SINGLE") {
    listTypeStyle = styles.postListSingle
  } else if (listType === "DOUBLE") {
    listTypeStyle = styles.postListDouble
  }

  return (
    <ul className={listTypeStyle}>
      {posts.map((postData) => (
        <li key={postData.id}>
          <Post postData={postData} />
        </li>
      ))}
    </ul>
  );
};

export default PostList;
