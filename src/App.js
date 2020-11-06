import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LogIn from './components/users/LogIn';
import UserRegistration from './components/users/UserRegistration';
import Vote from './components/users/Vote';
import Election from './components/admin/Election';
import VerifyEmail from './components/users/VerifyEmail';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/users/registration" component={UserRegistration} />
        <Route exact path="/vote" component={Vote} />
        <Route exact path="/admin/election" component={Election} />
        <Route exact path="/verify" component={VerifyEmail} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
