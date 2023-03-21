import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from "jwt-decode";

const Cart = () => {
    let [loggedIn, setLogin] = useState(false);

    const createCheckoutSession = () => {
        const paymentBackend = process.env.REACT_APP_BACKEND_PAYMENT_API;
            fetch(paymentBackend + "create-checkout-session", {
                method: "POST",
                body: JSON.stringify({})
            }).then(res => {
                if (res.ok) return res.json()
                return res.json().then(json => Promise.reject(json))
            })
                .then(({url}) => {
                    window.location = url
                })
                .catch(e => {
                    console.error(e)
                })
    }

    const checkLoginStatus = () => {
        if (localStorage.getItem("jwt-token") === null) {
            loggedIn = false;
            window.location.replace("http://localhost:3000/login");
        } else {
            const token = localStorage.getItem("jwt-token");
            var decodedToken = jwtDecode(token)
            var dateNow = new Date();

            if (decodedToken.exp * 1000 < dateNow.getTime()) {
                localStorage.removeItem("jwt-token")
            } else {
                loggedIn = true;
            }
        }
    }

    useEffect(() => {
        checkLoginStatus()
    });

    return (
        <div className="content">
            <div className="cart-container">
                <h1>Cart</h1>
                <div className="cart-item">
                    <div className="name-quantity">
                        <p className="product-name">Product Name 1</p>
                        <select id="quantity-dropdown">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <p className="product-price">19,99€</p>
                </div>

                <div className="cart-item">
                    <div className="name-quantity">
                        <p className="product-name">Product Name 2</p>
                        <select id="quantity-dropdown">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <p className="product-price">19,99€</p>
                </div>

                <div className="cart-item">
                    <div className="name-quantity">
                        <p className="product-name">Product Name 3</p>
                        <select id="quantity-dropdown">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <p className="product-price">19,99€</p>
                </div>

                <div className="cart-total-container">
                    <h3>TOTAL</h3>
                    <h3>59,97€</h3>
                </div>

                <div className="cart-buttons-container">
                    <Link to="/">
                        <button className="cart-button-shopping">Continue Shopping</button>
                    </Link>
                    <button className="cart-button-checkout" onClick={createCheckoutSession}>Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;