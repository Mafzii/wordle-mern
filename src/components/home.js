import React, { useState } from "react";
import {Navigate, useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';



const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/logout') // without the saved state
    }

    const handleGame = () => {
        navigate('/game', {state:{username:location.state.username}})
    }

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/home" className="navbar-brand">Wordle</Link>
                <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
                </li>
                <li className="navbar-item">
                <a className="nav-link" onClick={handleGame} >Play Game</a>
                </li>
                <li className="navbar-item">
                <Link to="/history" className="nav-link">History</Link>
                </li>
                <li className="navbar-item">
                <a className="nav-link" onClick={handleLogout} >Logout</a>
                </li>
                </ul>
                </div>
            </nav>
            <p>Welcome {location.state.username}</p>
        </div>
    )
}

export default Home;