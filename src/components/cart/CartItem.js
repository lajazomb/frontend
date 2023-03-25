// CartItem.js

import React, { useEffect, useState } from "react";

const CartItem = ({ productId, quantity, userId, updateTotal }) => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("0.00€");

    const fetchProductData = async () => {
        try {
            const response = await fetch(
                process.env.REACT_APP_BACKEND_PRODUCT_API + `/products/${productId}`
            );
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            const data = await response.json();
            setProductName(data.title);
            setPrice(data.price);
            updateTotal(data.price * quantity);
        } catch (error) {
            console.error(error);
        }
    };

    const removeFromCart = async () => {
        const data = { userId, productId };

        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_CART_API + `/cart/delete`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }

            window.location.href = process.env.BASE_URL + "/cart";

            // Update the total after the item is removed from the cart
            updateTotal(-(price * quantity));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, []);

    if (productName !== "" && price !== "0.00€") {
        return (
            <div className="cart-item">
                <div className="name-quantity">
                    <p className="product-name">{productName}</p>
                    <select id="quantity-dropdown">
                        <option value={quantity}>{quantity}</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <p className="product-price">{price * quantity}.00€</p>
                <p onClick={removeFromCart} className="product-name red-text">
                    Remove
                </p>
            </div>
        );
    } else {
        return null;
    }
};

export default CartItem;