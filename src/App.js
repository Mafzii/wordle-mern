import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import SignUp from "./components/signup"
import Home from "./components/home"
import Login from './components/login'
import Logout from './components/logout'
import Game from './components/game'


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/game" element={<Game/>} />
      </Routes>
      <div className="App">
        vibes
      </div>
    </Router>
  );
}

export default App;
