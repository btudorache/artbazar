import styles from "./UserPreviewList.module.css";

import UserPreview from "./UserPreview";

const UserPreviewList = ({ userPreviewList }) => {
  return (
    <ul className={styles.userPreviewList}>
      {userPreviewList.map((userPreview) => (
        <li className={styles.userPreviewElement} key={userPreview.id}>
          <UserPreview userPreview={userPreview} />
        </li>
      ))}
    </ul>
  );
};

export default UserPreviewList;
