import React from 'react';
import './App.css';
import Vote from './components/users/Vote';
import Election from './components/admin/Election';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <switch>
      <BrowserRouter>
        <Route exact path="/vote" component={Vote} />
        <Route exact path="/admin/election" component={Election} />
      </BrowserRouter>
    </switch>
  );
}

export default App;
