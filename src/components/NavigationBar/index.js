import React from "react";
import {Nav, NavLink, NavMenu} from "./NavigationBarElements";
import { BsFillCartFill } from "react-icons/bs";
import SearchBar from '../elements/searchBar'

const NavigationBar = () => {
    let activeStyle = {
        textDecoration: "none",
        color: "black"
    };

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
                <SearchBar/>
                <NavLink to="/cart" style={activeStyle}>
                    <BsFillCartFill/>
                </NavLink>
            </NavMenu>

        </Nav>
        </div>
    );
};

export default NavigationBar;

