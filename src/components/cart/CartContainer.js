import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import CartItem from "./CartItem";

const CartContainer = ({ itemPairs }) => {
    const [cartEmpty, setCartEmpty] = useState(true);


    const loadCart = () => {
        if (itemPairs !== undefined) {
            setCartEmpty(false);
        } else {
            setCartEmpty(true);
        }
    }

    useEffect(() => {
        loadCart();
        console.log(itemPairs)
    }, []);

    return (
        <div className="cart-container">
            <h1>Cart</h1>
            <div>
                {!cartEmpty && itemPairs.map((item) => (
                    <CartItem key={item.itemId} productId={item.itemId}  quantity={item.quantity} />
                ))}
                {cartEmpty && <h2>Your cart is empty.</h2>}
            </div>
        </div>
    );
};

export default CartContainer;
