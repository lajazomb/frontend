import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import CartContainer from "../components/cart/CartContainer";
import Loader from "../components/elements/loader";

const Cart = () => {
    const [loggedIn, setLogin] = useState(false);
    const [userId, setUserId] = useState("");
    const [cartData, setCartData] = useState(null);
    const [itemPairs, setItemPairs] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

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

    const updateTotal = (price) => {
        setTotal(prevTotal => prevTotal + price);
    }

    const checkLoginStatus = async () => {
        if (localStorage.getItem("jwt-token") === null) {
            setLogin(false);
            window.location.replace("http://localhost:3000/login");
        } else {
            const token = localStorage.getItem("jwt-token");
            var decodedToken = jwtDecode(token)
            var dateNow = new Date();

            if (decodedToken.exp * 1000 < dateNow.getTime()) {
                localStorage.removeItem("jwt-token");
                setLogin(false); // Update login status
            } else {
                setLogin(true); // Update login status
                setUserId(decodedToken.userid);
            }
        }
    };

    const getCart = async () => {
        try {
            const cartBackend = process.env.REACT_APP_BACKEND_CART_API;
            const token = localStorage.getItem("jwt-token");
            const decodedToken = jwtDecode(token);
            const response = await fetch(cartBackend + "/api/v1/cart/user/" + decodedToken.userid, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                console.log("Cart could not be loaded");
            }

            const cartData = await response.json();
            return cartData;
        } catch (error) {
            console.error(error);
        }
    };


    const fetchData = async () => {
        await checkLoginStatus();
        const cartData = await getCart();
        setCartData(cartData);
        const items = Object.entries(cartData.items).map(([itemId, quantity]) => ({ itemId, quantity }));
        setItemPairs(items);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="content">
            <div className="cart-container">
                {itemPairs.length > 0 && <CartContainer itemPairs={itemPairs} userId={userId} updateTotal={updateTotal}/>}
                {isLoading && <Loader/>}
                <div className="cart-total-container">
                    <h3>TOTAL</h3>
                    <h3>{total/2}€</h3>
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