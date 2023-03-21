import React, { useState } from "react";
import { Nav, NavLink, NavMenu } from "./NavigationBarElements";
import { BsFillCartFill } from "react-icons/bs";
import SearchBar from "../elements/searchBar";

const NavigationBar = ({ loggedIn }) => {
    let activeStyle = {
        textDecoration: "none",
        color: "black"
    };

    const [isLoggedOut, setIsLoggedOut] = useState(!loggedIn);

    const handleLogout = () => {
        if (loggedIn === true) {
            localStorage.removeItem("jwt-token");
            setIsLoggedOut(true);
        }
    };

    if (isLoggedOut) {
        return (
            <div className="navigation-menu">
                <Nav>
                    <NavLink to="/" style={activeStyle}>
                        <h1 id="homeLink">BOOKSTORE</h1>
                    </NavLink>
                    <NavMenu>
                        <NavLink to="/products" style={activeStyle}>
                            Products
                        </NavLink>
                        <NavLink to="/login" style={activeStyle}>
                            Login
                        </NavLink>
                        <NavLink to="/signup" style={activeStyle}>
                            Sign Up
                        </NavLink>
                        <SearchBar />
                        <NavLink to="/cart" style={activeStyle}>
                            <BsFillCartFill />
                        </NavLink>
                    </NavMenu>
                </Nav>
            </div>
        );
    } else {
        return (
            <div className="navigation-menu">
                <Nav>
                    <NavLink to="/" style={activeStyle}>
                        <h1 id="homeLink">BOOKSTORE</h1>
                    </NavLink>
                    <NavMenu>
                        <NavLink to="/products" style={activeStyle}>
                            Products
                        </NavLink>
                        <SearchBar />
                        <NavLink to="/cart" style={activeStyle}>
                            <BsFillCartFill />
                        </NavLink>
                        <NavLink to="/" style={activeStyle}>
                            Profile
                        </NavLink>
                        <NavLink style={activeStyle} onClick={handleLogout}>
                            Log Out
                        </NavLink>
                    </NavMenu>
                </Nav>
            </div>
        );
    }
};

export default NavigationBar;