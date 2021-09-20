import styles from "./ActionBar.module.css";

const ActionBar = () => {
  return (
    <div className={styles.actionBarLayout}>
      <h2 className={styles.actionBarHeader}>Action Bar</h2>
      <div className={styles.sectionDelimiter} />
      <ul className={styles.actionList}>
        <li className={styles.actionListElement}>
          <p>Surprise me!</p>
          <img src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/40/000000/external-magic-wand-photography-vitaliy-gorbachev-lineal-vitaly-gorbachev.png" />
        </li>
        <li>
          <p>Add Post</p>
          <img src="https://img.icons8.com/material-outlined/30/000000/add.png"/>
        </li>
        <li>
          <p>See commisions</p>
          <img src="https://img.icons8.com/material-outlined/30/000000/scroll.png"/>
        </li>
      </ul>
    </div>
  );
};

export default ActionBar;
