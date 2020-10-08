import React from 'react';
import './App.css';
import Vote from './components/users/Vote';
import Election from './components/admin/Election';
import ModalProposal from './components/admin/ModalProposal';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/vote" component={Vote} />
        <Route exact path="/admin/pruebaModal" component={ModalProposal} />
        <Route exact path="/admin/election" component={Election} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
