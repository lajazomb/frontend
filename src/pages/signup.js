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

    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:28082/auth/register', {
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
                window.location.href = "http://localhost:3000";
            })
            .catch(error => {
                console.error('There was a problem with the form submission:', error);
                // Handle the error case here
            });
    };

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
                            />
                        </div>
                        <label>Repeat your Password</label>
                        <div className="form-field-container">
                            <input
                                type="password"
                                className="form-field"
                                placeholder="Repeat your Password"
                                name="repeatPassword"
                            />
                        </div>
                        <div className="form-field-container">
                            <button type="submit" className="submit-button">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;