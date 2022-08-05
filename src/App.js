import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <Switch>
          <Route path="/" component={ Login } exact />
          <Route path="/settings" component={ Settings } />
          <Route path="/game" component={ Game } />
        </Switch>
      </header>
    </div>
  );
}
