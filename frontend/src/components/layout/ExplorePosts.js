import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState, Fragment } from "react";

import styles from "./ExplorePosts.module.css";
import LoadingSpinner from "./general/LoadingSpinner";
import PostList from "../posts/PostList";

import { resetExplorePosts } from "../../store/exploreSlice";
import { fetchExplorePosts } from "../../store/exploreSlice";

const ExplorePosts = () => {
  const { posts, status, error } = useSelector((state) => state.explore);
  const dispatch = useDispatch();
  const categoryFilterRef = useRef();
  const [categorySelected, setCategorySelected] = useState(false);

  const categoryFilterHandler = () => {
    dispatch(resetExplorePosts());
    setCategorySelected(true);
  };

  const removeFilterHandler = () => {
    dispatch(resetExplorePosts());
    categoryFilterRef.current.value = "UNSELECTED";
    setCategorySelected(false);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchExplorePosts(categoryFilterRef.current.value));
    }
  }, [dispatch, status]);

  return (
    <Fragment>
      <div className={styles.filterPosts}>
        <form className={styles.categoryFilterForm}>
          <label className={styles.categoryFilterText} htmlFor="filterCategory">
            Filter posts by category
          </label>
          <select
            defaultValue="UNSELECTED"
            className={styles.categoryFilterSelect}
            onChange={categoryFilterHandler}
            ref={categoryFilterRef}
            id="filterCategory"
            name="filterCategory"
          >
            <option
              value="UNSELECTED"
              className={styles.disabledOption}
              disabled
            >
              -- select an option --
            </option>
            <option value="PAINTING">Painting</option>
            <option value="CRAFTS">Crafts</option>
            <option value="DIGITAL">Digital</option>
            <option value="DRAWING">Drawing</option>
            <option value="PHOTOGRAPHY">Photography</option>
          </select>
          {categorySelected && (
            <Fragment>
              <p
                className={styles.removeFilterText}
                onClick={removeFilterHandler}
              >
                Remove Filter
              </p>
              <img src="https://img.icons8.com/ios-glyphs/20/000000/delete-sign.png" />
            </Fragment>
          )}
        </form>
      </div>
      {status === "succeeded" && <PostList posts={posts} listType="DOUBLE" />}
      {status === "succeeded" && posts.length === 0 && <p>No posts found.</p>}
      {status === "loading" && <LoadingSpinner />}
      {status === "failed" && <p className="errorText">{error}</p>}
    </Fragment>
  );
};

export default ExplorePosts;
