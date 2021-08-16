import { NavLink, Link } from "react-router-dom";

import styles from "./NavigationBar.module.css";

const NavigationBar = () => {
  return (
    <footer className={styles.navBar}>
      <div className={styles.navLogo}>
        <h2><Link to="/">ArtBazar</Link></h2>
      </div>
      <nav className={styles.navLinks}>
        <ul>
          <NavLink className={styles.navLink} to="/explore">Explore</NavLink>
          <NavLink className={styles.navLink} to="/login">Login</NavLink>
          <NavLink className={styles.navLink} to="/logout">Logout</NavLink>
          <NavLink className={styles.navLink} to="/collection">Collection</NavLink>
          <NavLink className={styles.navLink} to="/profile">Profile</NavLink>
          <NavLink className={styles.navLink} to="/register">Register</NavLink>
        </ul>
      </nav>
    </footer>
  );
};

export default NavigationBar;
