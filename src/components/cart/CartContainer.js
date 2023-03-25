// CartContainer.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

const CartContainer = ({ itemPairs, userId, updateTotal }) => {
    const [cartEmpty, setCartEmpty] = useState(true);

    useEffect(() => {
        if (itemPairs !== undefined && itemPairs.length > 0) {
            setCartEmpty(false);
        } else {
            setCartEmpty(true);
        }
    }, [itemPairs]);

    return (
        <div className="cart-container">
            <h1>Cart</h1>
            <div>
                {!cartEmpty &&
                itemPairs.map((item) => (
                    <CartItem
                        key={item.itemId}
                        productId={item.itemId}
                        quantity={item.quantity}
                        userId={userId}
                        updateTotal={updateTotal}
                    />
                ))}
                {cartEmpty && <h2>Your cart is empty.</h2>}
            </div>
        </div>
    );
};

export default CartContainer;