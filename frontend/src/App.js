import './App.css';
import { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import NavigationBar from './components/layout/navigation/NavigationBar';
import HomePage from './views/HomePage';


function App() {
  return (
    <Fragment>
      <NavigationBar />
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
