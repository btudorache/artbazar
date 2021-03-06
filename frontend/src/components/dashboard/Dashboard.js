import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboardPosts } from "../../store/dashboardSlice";

import styles from "./Dashboard.module.css";

import LoadingSpinner from "../layout/general/LoadingSpinner";
import NewPostSection from "./NewPostSection";
import ActionBar from "./ActionBar";
import PostList from "../posts/PostList";

const Dashboard = () => {
  const { posts, status, error } = useSelector((state) => state.dashboard);
  const { showNewPostSection } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDashboardPosts());
    }
  }, [dispatch, status]);

  return (
    <div className={styles.mainLayout}>
      <ActionBar />
      <div className={styles.mainSide}>
        {showNewPostSection && (
          <NewPostSection />
        )}
        {status === "succeeded" && posts.length === 0 && (
          <p>
            No posts currently. Go to Explore and find some artists you like!
          </p>
        )}
        {status === "succeeded" && <PostList posts={posts} listType="SINGLE" />}
        {status === "loading" && <LoadingSpinner />}
        {status === "failed" && <p className="errorText">{error}</p>}
      </div>
    </div>
  );
};

export default Dashboard;
