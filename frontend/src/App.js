import './App.css';
import { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import NavigationBar from './components/layout/navigation/NavigationBar';
import HomePage from './views/HomePage';
import RegisterPage from './views/RegisterPage';


function App() {
  return (
    <Fragment>
      <NavigationBar />
      <Switch>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
