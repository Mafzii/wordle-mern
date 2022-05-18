import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Wordle</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Log In</Link>
          </li>
          <li className="navbar-item">
          <Link to="/signup" className="nav-link">Sign Up</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;