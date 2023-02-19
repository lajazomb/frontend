import React from "react";
import {Nav, NavLink, NavMenu} from "./NavigationBarElements";
import { BsFillCartFill } from "react-icons/bs";
import SearchBar from '../elements/searchBar'

const NavigationBar = () => {
    return (
        <>
        <Nav>
            <h1>BOOKSTORE</h1>
            <NavMenu>
                <NavLink to="/products" activeStyle>
                    Products
                </NavLink>
                <NavLink to="/login" activeStyle>
                    Login
                </NavLink>
                <NavLink to="/signup">
                    Sign Up
                </NavLink>
                <SearchBar/>
                <NavLink to="/cart">
                    <BsFillCartFill/>
                </NavLink>
            </NavMenu>

        </Nav>
        </>
    );
};

export default NavigationBar;

