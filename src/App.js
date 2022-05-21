import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import SignUp from "./components/signup"
import Home from "./components/home"
import Login from './components/login'
import Logout from './components/logout'
import Game from './components/game'
import History from './components/history'


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/game" element={<Game/>} />
          <Route path="/history" element={<History/>} />
      </Routes>
      <div className="App">
        {/* put whatever u wanna see across the whole app */}
      </div>
    </Router>
  );
}

export default App;
