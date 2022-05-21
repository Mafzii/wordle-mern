import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import './style.css'

let allGames;
axios.get('http://localhost:8000/hist')
    .then(res => {
        const history = res.data;
        allGames = history;
        console.log(history)
    })
    .catch(err => {
        console.log(err)
    });

const History = () => {
    const navigate = useNavigate()
    const location = useLocation();

    const [history, setHistory] = useState(allGames)

    const handleHome = () => {
        navigate('/home', {state:{username:location.state.username}})
    }

    return (
    <div>
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                <a onClick={handleHome} className="nav-link">Home</a>
                </li>
            </ul>
        </nav>
        <p>{location.state.username}'s History Page</p>

        <div>
            {
                history?.map((games) => {
                    console.log(games);
                    if (games.username == location.state.username) {
                        const guesses = games.playspace;
                        const words = games.words;
                        return (
                            <div>
                                {games.won ? (<p className="p">Result: Won</p>) : (<p className="p">Result: Lost</p>)}
                                <p className="p">The mystery word was: {games.word}</p>
                                <div id="game-board" className="game-board">
                                {
                                    guesses?.map((row, i) => {
                                        return (
                                            <div className="letter-row">
                                            {
                                                row.map((box, j) => {
                                                    if (box == "-") {
                                                        return (
                                                            <div className="letter-box"></div>
                                                        )
                                                    }
                                                    if (box == "g") {
                                                        return (
                                                            <div className="letter-box-green">{words[i][j]}</div>
                                                        )
                                                    }
                                                    if (box == "y") {
                                                        return (
                                                            <div className="letter-box-yellow">{words[i][j]}</div>
                                                        )
                                                    }
                                                    if (box == "e") {
                                                        return (
                                                            <div className="letter-box-gray">{words[i][j]}</div>
                                                        )
                                                    }
                                                    
                                                })
                                            }
                                            </div>
                                        )
                                        
                                    })
                                }
                                </div>
                                <br/><br/>
                            </div>
                        )
                    }
                })
            }
        </div>
    </div>
    )

}

export default History;