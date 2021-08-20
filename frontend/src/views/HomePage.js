import { useSelector } from "react-redux";

import styles from "./HomePage.module.css";
import Card from "../components/layout/Card";

const HomePage = () => {
  const isLogged = useSelector(state => state.auth.isLogged)
  
  return (
    <Card>
      {isLogged ? <h1>You're logged in!</h1> : <h1>Want to register?</h1>}
    </Card>
  );
};

export default HomePage;
