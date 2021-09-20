import { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import styles from './App.module.css'

import NavigationBar from "./components/layout/navigation/NavigationBar";
import HomePage from "./views/HomePage";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import LogoutPage from "./views/LogoutPage";
import UserDetailPage from "./views/UserDetailPage";
import UserEditPage from "./views/UserEditPage";
import NewPostPage from "./views/NewPostPage";
import ProtectedPage from "./components/routing/ProtectedPage";
import PostDetailPage from "./views/PostDetailPage";
import ExplorePage from "./views/ExplorePage";
import UserProfilePage from "./views/UserProfilePage";

function App() {
  return (
    <Fragment>
      <NavigationBar />
      <div className={styles.navPlaceholder} />
      <Switch>
        <Route exact path="/newpost">
          <ProtectedPage authPath permissionLevels={["ARTIST"]}>
            <NewPostPage />
          </ProtectedPage>
        </Route>
        <Route exact path="/profile">
          <ProtectedPage authPath permissionLevels={["ARTIST", "EXPLORER"]}>
            <UserProfilePage />
          </ProtectedPage>
        </Route>
        <Route exact path="/users/:urlUsername">
          <ProtectedPage authPath permissionLevels={["ARTIST", "EXPLORER"]}>
            <UserDetailPage />
          </ProtectedPage>
        </Route>
        <Route exact path="/profile/edit">
          <ProtectedPage authPath permissionLevels={["ARTIST", "EXPLORER"]}>
            <UserEditPage />
          </ProtectedPage>
        </Route>
        <Route exact path="/login">
          <ProtectedPage>
            <LoginPage />
          </ProtectedPage>
        </Route>
        <Route exact path="/register">
          <ProtectedPage>
            <RegisterPage />
          </ProtectedPage>
        </Route>
        <Route exact path="/logout">
          <ProtectedPage authPath permissionLevels={["ARTIST", "EXPLORER"]}>
            <LogoutPage />
          </ProtectedPage>
        </Route>
        <Route exact path="/posts/:postId">
          <ProtectedPage authPath permissionLevels={["ARTIST", "EXPLORER"]}>
            <PostDetailPage />
          </ProtectedPage>
        </Route>
        <Route exact path="/explore">
          <ProtectedPage authPath permissionLevels={["ARTIST", "EXPLORER"]}>
            <ExplorePage />
          </ProtectedPage>
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Fragment>
  );
}

export default App;
