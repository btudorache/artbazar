import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./NavigationBar.module.css";

const NavigationBar = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);

  return (
    <footer className={styles.navBar}>
      <div className={styles.navLogo}>
        <h2>
          <Link to="/">ArtBazar</Link>
        </h2>
      </div>
      <nav className={styles.navLinks}>
        <ul>
          {isLogged && (
            <NavLink className={styles.navLink} to="/explore">
              Explore
            </NavLink>
          )}
          {!isLogged && <NavLink className={styles.navLink} to="/login">
            Login
          </NavLink>}
          {isLogged && <NavLink className={styles.navLink} to="/collection">
            Collection
          </NavLink>}
          {isLogged && <NavLink className={styles.navLink} to="/profile">
            Profile
          </NavLink>}
          {!isLogged && <NavLink className={styles.navLink} to="/register">
            Register
          </NavLink>}
          {isLogged && <NavLink className={styles.navLink} to="/logout">
            Logout
          </NavLink>}
        </ul>
      </nav>
    </footer>
  );
};

export default NavigationBar;
