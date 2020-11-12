import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserRegistration from './components/users/UserRegistration';
import ResultsPage from './components/users/ResultsPage';
import Vote from './components/users/Vote';
import Election from './components/admin/Election';
import Home from './components/Home';
import VerifyEmail from './components/users/VerifyEmail';
import ResetPassword from './components/users/ResetPassword';
import NewPassword from './components/users/NewPassword';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users/registration" component={UserRegistration} />
        <Route exact path="/users/result" component={ResultsPage} />
        <Route exact path="/vote" component={Vote} />
        <Route exact path="/admin/election" component={Election} />
        <Route exact path="/verify" component={VerifyEmail} />
        <Route exact path="/reset" component={ResetPassword} />
        <Route exact path="/newpass" component={NewPassword} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
