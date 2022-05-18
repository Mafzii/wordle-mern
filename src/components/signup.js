import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar"


const SignUp = () => {
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

        const newUser = {
            username: username,
            password: password
        };
        console.log(newUser)

        axios.post('http://localhost:8000/users/add', newUser)
            .then(res => {
                console.log(res.data)
                navigate('/');
            })
            .catch(err => {
                console.log(err)
                 if (err.response.status == 400) {
                     alert("Username already taken!");
                 }
                });
    }

    return (
    <div>
        <Navbar/>
        <p>SignUp Page</p>
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

                <button className="item" type="submit">Sign Up</button>
        </form>
    </div>
    )

}

export default SignUp;