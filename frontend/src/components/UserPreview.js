import styles from "./UserPreview.module.css";

const UserPreview = ({ userPreview }) => {
  return (
    <div className={styles.userPreviewLayout}>
      <img className={styles.userPreviewImage} src={userPreview.imageUrl}></img>
      <div className={styles.userPreviewInfo}>
        <p>{userPreview.username}</p>
        <p>{userPreview.usertype}</p>
      </div>
    </div>
  );
};

export default UserPreview;
