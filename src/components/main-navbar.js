import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Mainbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/home" className="navbar-brand">Wordle</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          </li>
          <li className="navbar-item">
          <Link to="/game" className="nav-link">Play Game</Link>
          </li>
          <li className="navbar-item">
          <Link to="/history" className="nav-link">History</Link>
          </li>
          <li className="navbar-item">
          <Link to="/logout" className="nav-link">Logout</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}

export default Mainbar;