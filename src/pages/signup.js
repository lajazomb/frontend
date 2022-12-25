import React from 'react';

const Signup = () => {
    return (
        <div className="content">
            <div className="login-form-container">
                <form className="login-form">
                    <div className="login-form-content">
                        <h1>Sign Up</h1>
                        <label>Email address</label>
                        <div className="form-field-container">
                            <input type="email" className="form-field" placeholder="Enter your Email"/>
                        </div>
                        <label>Name</label>
                        <div className="form-field-container">
                            <input className="form-field" placeholder="Enter your Prename"/>
                        </div>
                        <label>Surname</label>
                        <div className="form-field-container">
                            <input className="form-field" placeholder="Enter your Surname"/>
                        </div>
                        <label>Password</label>
                        <div className="form-field-container">
                            <input type="password" className="form-field" placeholder="Enter your Password"/>
                        </div>
                        <label>Repeat your Password</label>
                        <div className="form-field-container">
                            <input type="password" className="form-field" placeholder="Repeat your Password"/>
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