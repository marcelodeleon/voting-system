import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserRegistration from './components/users/UserRegistration';
import ResultsPage from './components/users/ResultsPage';
import Vote from './components/users/Vote';
import Election from './components/admin/Election';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users/registration" component={UserRegistration} />
        <Route exact path="/users/result" component={ResultsPage} />
        <Route exact path="/vote" component={Vote} />
        <Route exact path="/admin/election" component={Election} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
