import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LogIn from './components/users/LogIn';
import Vote from './components/users/Vote';
import Election from './components/admin/Election';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/vote" component={Vote} />
        <Route exact path="/admin/election" component={Election} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
