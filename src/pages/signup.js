import React, { useState } from 'react';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: 'Teststreet 12',
        country: 'Germany',
        city: 'Berlin',
        zipCode: '12345'
    });

    const [repeatPassword, setRepeatPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [formValid, setFormValid] = useState(false);

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleInputChangeRepeatPassword = (event) => {
        setRepeatPassword(event.target.value);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const userBackend = process.env.REACT_APP_BACKEND_USER_API;

        fetch(userBackend + '/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    setErrorMessage("Error: Registration could not be completed.");
                }
                return response.json();
            })
            .then(data => {
                const jwtToken = data.token; // Extract the "value" attribute from the JSON response
                localStorage.setItem("jwt-token", jwtToken); // Save the token in local storage
                window.location.href = process.env.BASE_URL;
            })
            .catch(error => {
                console.error('There was a problem with the form submission:', error);
                // Handle the error case here
            });
    };

    const checkFormValidity = (event) => {

        //check if email is valid
        const email = formData.email;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setFormValid(false);
            console.log("Invalid email")
        } else if (formData.password === '') {
            setFormValid(false);
            console.log("Invalid password")
        } else if (repeatPassword === '') {
            setFormValid(false);
            console.log("Repeat password is empty");
        } else if (formData.password !== repeatPassword) {
            setFormValid(false);
            console.log("Passwords do not match");
        } else if (formData.lastName === '' || formData.firstName === '') { // this line had a typo
            setFormValid(false);
            console.log("Invalid names")
        } else {
            setFormValid(true);
            console.log("all good")
        }
    }

    const checkPasswords = (event) => {
        const repeatPasswordValue = event.target.value;

        if (formData.password !== repeatPasswordValue) {
            setErrorMessage("Passwords do not match");
            setFormValid(false);
        } else {
            setErrorMessage("");
            setFormValid(true);
        }
    };

    const checkName = (event) => {
        const name = event.target.value;
        const nameRegex = /^[a-zA-Z]+$/;
        if (!nameRegex.test(name)) {
            setErrorMessage("Please enter a valid name");
        } else {
            setErrorMessage("");
        }
    }


    const checkEmail = (event) => {
        const email = event.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email address");
        } else {
            setErrorMessage("");
        }

    }

    return (
        <div className="content">
            <div className="login-form-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    {errorMessage && <div style={{ backgroundColor: "red", color: "white", padding: "10px", borderRadius: "5px", marginTop: "10px" }}>{errorMessage}</div>}
                    <div className="login-form-content">
                        <h1>Sign Up</h1>
                        <label>Email address</label>
                        <div className="form-field-container">
                            <input
                                type="email"
                                className="form-field"
                                placeholder="Enter your Email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                onBlur={checkEmail}
                            />
                        </div>
                        <label>Name</label>
                        <div className="form-field-container">
                            <input
                                className="form-field"
                                placeholder="Enter your First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                onBlur={checkFormValidity}
                            />
                        </div>
                        <label>Surname</label>
                        <div className="form-field-container">
                            <input
                                className="form-field"
                                placeholder="Enter your Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                onBlur={(event) => {
                                    checkFormValidity(event);
                                    checkName(event);
                                }}
                            />
                        </div>
                        <label>Password</label>
                        <div className="form-field-container">
                            <input
                                type="password"
                                className="form-field"
                                placeholder="Enter your Password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                onBlur={checkFormValidity}
                            />
                        </div>
                        <label>Repeat your Password</label>
                        <div className="form-field-container">
                            <input
                                type="password"
                                className="form-field"
                                placeholder="Repeat your Password"
                                name="repeatPassword"
                                onChange={(event) => {
                                    checkPasswords(event);
                                    handleInputChangeRepeatPassword(event);
                                }}
                                onBlur={checkFormValidity}
                            />
                        </div>
                        <div className="form-field-container">
                            <button type="submit" disabled={!formValid} className="submit-button">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;