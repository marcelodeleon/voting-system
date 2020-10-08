import React from 'react';
import logo from './logo.svg';
import './App.css';
import Vote from './pages/Vote';
import Election from './pages/Election';
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
