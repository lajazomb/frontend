import React, { useState, componentDidMount, useEffect } from "react";
import * as jwt from 'jwt-decode'
import jwtDecode from "jwt-decode";


const Login = () => {
    const userBackend = process.env.REACT_APP_BACKEND_USER_API;
    const baseUrl = process.env.BASE_URL;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    let [loggedIn, setLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formValid, setFormValid] = useState(false);


    const checkEmail = (event) => {
        const email = event.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email address");
        } else {
            setErrorMessage("");
        }
    }


    const checkForm = () => {

        if (email === '') {
            setErrorMessage("Please enter an email address");
            setFormValid(false);
        } else if (password === '') {
            setErrorMessage("Please enter a password");
            setFormValid(false);
        } else {
            setErrorMessage("");
            setFormValid(true);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { email, password };
        const response = await fetch(userBackend + "/api/v1/auth/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    setErrorMessage("Invalid username or password");
                }
                return response.json();
            })
            .then(data => {
                const jwtToken = data.token; // Extract the "value" attribute from the JSON response
                localStorage.setItem("jwt-token", jwtToken); // Save the token in local storage
                window.location.replace("http://localhost:3000/products");
            })
    };

    const checkLoginStatus = () => {
        if (localStorage.getItem("jwt-token") === null) {
            loggedIn = false;
        } else {
            const token = localStorage.getItem("jwt-token");
            var decodedToken = jwtDecode(token)
            var dateNow = new Date();

            if (decodedToken.exp * 1000 < dateNow.getTime()) {
                localStorage.removeItem("jwt-token")
            } else {
                loggedIn = true;
                window.location.replace("http://localhost:3000/products");
            }
        }
    }

    useEffect(() => {
        checkLoginStatus()
        if (loggedIn == true) {
            window.location.href = "http://localhost:3000/products";
        }
    });

    return (

        <div className="content">
            <div className="login-form-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    {errorMessage && <div style={{ backgroundColor: "red", color: "white", padding: "10px", borderRadius: "5px", marginTop: "10px" }}>{errorMessage}</div>}
                    <div className="login-form-content">
                        <h1>Sign In</h1>
                        <label>Email address</label>
                        <div className="form-field-container">
                            <input
                                type="email"
                                className="form-field"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                    checkEmail(event);
                                }}
                                onBlur={checkForm}
                            />
                        </div>
                        <label>Password</label>
                        <div className="form-field-container">
                            <input
                                type="password"
                                className="form-field"
                                placeholder="Enter your Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                onBlur={checkForm}
                            />
                        </div>
                        <div className="form-field-container">
                            <button type="submit" disabled={!formValid} className="submit-button">
                                Sign in
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
