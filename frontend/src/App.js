import "./App.css";
import { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import NavigationBar from "./components/layout/navigation/NavigationBar";
import HomePage from "./views/HomePage";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import LogoutPage from "./views/LogoutPage";
import UserProfilePage from "./views/UserProfilePage";
import NewPostPage from "./views/NewPostPage";

function App() {
  const isLogged = useSelector((state) => state.auth.isLogged);

  return (
    <Fragment>
      <NavigationBar />
      <Switch>
        <Route exact path="/newpost" component={NewPostPage} />
        <Route exact path="/profile" component={UserProfilePage} />
        <Route exact path="/login">
          {isLogged ? <Redirect to="/" /> : <LoginPage />}
        </Route>
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/logout" component={LogoutPage} />
        <Route exact path="/" component={HomePage} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  );
}

export default App;
