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
import RandomPostPage from './views/RandomPostPage'
import UserProfilePage from "./views/UserProfilePage";
import UserAllPostsPage from "./views/UserAllPostsPage";

function App() {
  return (
    <Fragment>
      <NavigationBar />
      <div className={styles.navPlaceholder} />
      <Switch>
        <Route exact path="/newpost">
          <ProtectedPage authPath permissionLevels={["Artist"]}>
            <NewPostPage />
          </ProtectedPage>
        </Route>
        <Route exact path="/profile">
          <ProtectedPage authPath permissionLevels={["Artist", "Explorer"]}>
            <UserProfilePage />
          </ProtectedPage>
        </Route>
        <Route exact path="/users/:urlUsername">
          <ProtectedPage authPath permissionLevels={["Artist", "Explorer"]}>
            <UserDetailPage />
          </ProtectedPage>
        </Route>
        <Route exact path="/users/allposts/:urlUsername">
          <ProtectedPage authPath permissionLevels={["Artist", "Explorer"]}>
            <UserAllPostsPage />
          </ProtectedPage>
        </Route>
        <Route exact path="/profile/edit">
          <ProtectedPage authPath permissionLevels={["Artist", "Explorer"]}>
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
          <ProtectedPage authPath permissionLevels={["Artist", "Explorer"]}>
            <LogoutPage />
          </ProtectedPage>
        </Route>
        <Route exact path="/posts/:postId">
          <ProtectedPage authPath permissionLevels={["Artist", "Explorer"]}>
            <PostDetailPage />
          </ProtectedPage>
        </Route>
        <Route exact path="/explore">
          <ProtectedPage authPath permissionLevels={["Artist", "Explorer"]}>
            <ExplorePage />
          </ProtectedPage>
        </Route>
        <Route exact path="/random">
          <ProtectedPage authPath permissionLevels={["Artist", "Explorer"]}>
            <RandomPostPage />
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
