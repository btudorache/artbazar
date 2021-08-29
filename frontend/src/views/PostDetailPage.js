import { useParams } from "react-router";
import { useSelector } from "react-redux";

import Post from "../components/Post";

import styles from "./PostDetailPage.module.css";

const PostDetailPage = () => {
  const posts = useSelector((state) => state.posts.posts);
  const { postId } = useParams();

  const postDetail = posts.find((post) => post.id === +postId);
  return (
    <div className={styles.postDetail}>
      <Post postData={postDetail} />
    </div>
  );
};

export default PostDetailPage;
