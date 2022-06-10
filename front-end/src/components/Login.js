import React, { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom';
require('../styles/Login.css');
require('../styles/App.css');
export const UserContext = createContext();

function Login() {
    const [username, setUsername] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const usernameChangeHandler = (event) => {
        setUsername(event.target.value);
    }

    const usernameSubmitHandler = (event) => {
        event.preventDefault();
        setSubmitted(true);
    }

    useEffect(() => {
        if (submitted) {
            sessionStorage.setItem('username', username);
            navigate('/chat');
        }
    }, [submitted]);

    return (

        <form onSubmit={usernameSubmitHandler} className="username-container">
            <h1>My Chat Task</h1>
            <div>
                <input
                    type="text"
                    onChange={usernameChangeHandler}
                    placeholder="Enter a username..."
                    required />
            </div>
            <input type="submit" value="Submit" />
        </form>
    )

}

export default Login