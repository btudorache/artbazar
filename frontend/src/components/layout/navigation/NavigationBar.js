import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./NavigationBar.module.css";

const NavigationBar = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);

  const loggedInLinks = (
    <ul>
      <NavLink
        activeClassName={styles.activeLink}
        className={styles.navLink}
        to="/explore"
      >
        Explore
      </NavLink>
      <NavLink
        activeClassName={styles.activeLink}
        className={styles.navLink}
        to="/collection"
      >
        Collection
      </NavLink>
      <NavLink
        activeClassName={styles.activeLink}
        className={styles.navLink}
        to="/profile"
      >
        Profile
      </NavLink>
      <NavLink
        activeClassName={styles.activeLink}
        className={styles.navLink}
        to="/logout"
      >
        Logout
      </NavLink>
    </ul>
  );

  const loggedOutLinks = (
    <ul>
      <NavLink
        activeClassName={styles.activeLink}
        className={styles.navLink}
        to="/login"
      >
        Login
      </NavLink>
      <NavLink
        activeClassName={styles.activeLink}
        className={styles.navLink}
        to="/register"
      >
        Register
      </NavLink>
    </ul>
  );

  return (
    <footer className={styles.navBar}>
      <div className={styles.navLogo}>
        <h2>
          <Link to="/">ArtBazar</Link>
        </h2>
      </div>
      <nav className={styles.navLinks}>
        {isLogged && loggedInLinks}
        {!isLogged && loggedOutLinks}
      </nav>
    </footer>
  );
};

export default NavigationBar;
