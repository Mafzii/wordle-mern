import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import './style.css'

const playSpace = [
    ['-','-','-','-','-'],
    ['-','-','-','-','-'],
    ['-','-','-','-','-'],
    ['-','-','-','-','-'],
    ['-','-','-','-','-'],
    ['-','-','-','-','-']
]
let wordle = ''
axios.get('https://random-word-api.herokuapp.com/word?length=5').then((w) => wordle = w.data[0])



const Game = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [guesses, setGuesses] = useState([[]])
    const [word, setWord] = useState(wordle)
    const [guess, setGuess] = useState('')
    const [turn, setTurn] = useState(0)

    

    const handleHome = () => {
        navigate('/home', {state:{username:location.state.username}})
    }

    const changeGuess = (event) => {
        setGuess(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(wordle)

        if (guess.length == 5) {
            for (let i=0; i<5; i++) {
                // check against word
                for (let j=0; j<5; j++) {
                    if (guess[i] == wordle[j]) {
                        if (i == j) {
                            playSpace[i][turn] = 'g'
                        }
                        else {
                            playSpace[i][turn] = 'y'
                        }
                    }
                }
            }
        }
        setTurn(turn+1)
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
        <p>{location.state.username}'s Game Page</p>

        <div>
            <div className="game-board">
            {
                playSpace.map((row) => {
                    return (
                        <div className="letter-row">
                        {
                            row.map((box) => {
                                if (box == "-") {
                                    return (
                                        <div className="letter-box"></div>
                                    )
                                }
                                else if (box == "g") {
                                    <div class="letter-box-green"></div>
                                }
                                else if (box == "y") {
                                    <div class="letter-box-yellow"></div>
                                }
                                
                            })
                        }
                        </div>
                    )
                    
                })
            }
            </div>
            <form id='myform' className='form' onSubmit={onSubmit} >
                <div>
                    <label><b>Enter 5 Letter Word</b>
                    <input type="text" placeholder="Enter Here" required onChange={changeGuess}/>
                    </label>
                </div>

                    <button type="submit">Guess Word</button>
            </form>
        </div>
    </div>
    )

}

export default Game;