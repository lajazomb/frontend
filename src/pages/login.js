import React from "react";

const Login = () => {
    return (
        <div className="content">
            <div className="login-form-container">
                <form className="login-form">
                    <div className="login-form-content">
                        <h1>Sign In</h1>
                        <label>Email address</label>
                        <div className="form-field-container">
                            <input type="email" className="form-field" placeholder="Enter your Email"/>
                        </div>
                        <label>Password</label>
                        <div className="form-field-container">
                            <input type="password" className="form-field" placeholder="Enter your Password"/>
                        </div>
                        <div className="form-field-container">
                            <button type="submit" className="submit-button">Sign in</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;