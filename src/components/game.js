import React, { useState, useEffect } from "react";
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
const wordSpace = [
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
    const [guesses, setGuesses] = useState(playSpace)
    const [words, setWords] = useState(wordSpace)
    const [guess, setGuess] = useState('')
    const [turn, setTurn] = useState(0)
    const [win, setWin] = useState(false)
    
    const handleWin = () => {
        const newHist = {
            username: location.state.username,
            playspace: guesses,
            words: words,
            won: win,
            word: wordle
        }
        console.log(newHist)

        axios.post('http://localhost:8000/hist/add', newHist)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    }

    const handleHome = () => {
        navigate('/home', {state:{username:location.state.username}})
    }

    const handleReset = () => {
        handleWin()
        window.location.reload(false);
    }

    const changeGuess = (event) => {
        setGuess(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(wordle)
        const newPlaySpace = guesses; 
        if (guess.length == 5 && win == false) {
            // green check
            for (let i = 0; i < 5; i++) {
                if (guess[i] == wordle[i]) {
                    newPlaySpace[turn][i] = 'g';
                }
            }
            // yellow check
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    if (guess[i] == wordle[j]) {
                        if (newPlaySpace[turn][i] == '-')
                            newPlaySpace[turn][i] = 'y';
                    }
                }
            }
            // set rest to grey
            for (let i = 0; i < 5; i++) {
                if (newPlaySpace[turn][i] == '-') {
                    newPlaySpace[turn][i] = 'e';
                }
            }

            // set words array
            const newWords = words;
            for (let i = 0; i < 5; i++) {
                newWords[turn][i] = guess[i];
            }

            setWords(newWords)
            console.log(guess)
            setGuesses(newPlaySpace)
            console.log(guesses)
            setTurn(turn+1)
            console.log(`turn number: ${turn}`);
        }
        // check win condition
        const allEqual = arr => arr.every( elem => elem == 'g' )
        console.log(allEqual(guesses[turn]))
        if (allEqual(guesses[turn]) == true) {
            setWin(true)
        }
        console.log(guesses[turn])
        setGuess('');
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
            <div id="game-board" className="game-board">
            {
                guesses.map((row, i) => {
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
            <fieldset disabled={win}>
                <form id='myform' className='form' onSubmit={onSubmit} >
                    <div>
                        <label><b>Enter 5 Letter Word: </b>
                        <input type="text" placeholder="Enter Here" required onChange={changeGuess} value={guess}/>
                        </label>
                    </div>
                    <button type="submit">Guess Word</button>
                </form>
            </fieldset>
            <div>
                <br/>
                {win == true ? (
                    <div className="button">
                        <p className="p"> You have won in {turn} turns!!!</p>
                        <button type="submit" onClick={handleReset}>Reset</button>
                    </div>) : null}
                {win == false && turn == 6 ? (
                    <div className="button">
                        <p className="p"> The word was {wordle}!</p>
                        <button type="submit" onClick={handleReset}>Reset</button>
                    </div>) : null}
            </div>
        </div>
    </div>
    )

}

export default Game;