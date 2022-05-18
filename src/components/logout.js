import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    }

    return (
        <div>
            <button className="item" type="submit" onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default Logout;