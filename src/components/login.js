import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';
import Navbar from "./navbar"


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const changeUsername = (event) => {
        setUsername(event.target.value)
    }

    const changePassword = (event) => {
        setPassword(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const User = {
            username: username,
            password: password
        };

        console.log(User)

        axios.get('http://localhost:8000/users')
            .then(res => {
                const users = res.data;
                console.log(users)
                if (users.length > 0) {
                    for (let i=0; i<users.length; i++) {
                        if (users[i].username == User.username) {
                            if (users[i].password == User.password) {
                                navigate('/home', {state:{username:User.username}});
                            }
                        }
                    }
                }
            })
            .catch(err => {
                console.log(err)
                 if (err.response.status == 400) {
                     alert("Username not found!");
                 }
                });
    }

    return (
   
    <div>
        <Navbar/>
        <p>LogIn Page</p>
        <form id='myform' className='form' onSubmit={onSubmit} >
            <div className='item'>
                <label><b>Username</b>
                <input type="text" placeholder="Enter Username" required onChange={changeUsername}/>
                </label>
            </div>

            <div className='item'>
                <label><b>Password</b>
                <input type="password" placeholder="Enter Password" required onChange={changePassword}/>
                </label>
            </div>

                <button className="item" type="submit">Log In</button>
        </form>
    </div>
    )

}

export default Login;