import React, { useEffect, useState } from "react";

const CartItem = ({ productId, quantity, userId, updateTotal }) => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("0.00€");

    const fetchProductData = async () => {
        try {
            const response = await fetch(
                process.env.REACT_APP_BACKEND_PRODUCT_API + `/api/v1/products/${productId}`
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

    const handleDropdownChange = async (event) => {
        const data = { userId, productId, quantity: event.target.value };

        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_CART_API + `/api/v1/cart/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }

            window.location.href = "http://localhost:3000/cart";

            // Update the total after the item quantity is changed
            updateTotal((data.price * event.target.value) - (data.price * quantity));
        } catch (error) {
            console.error(error);
        }
    }

    const removeFromCart = async () => {
        const data = { userId, productId };

        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_CART_API + `/api/v1/cart/delete`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }

            window.location.href = "http://localhost:3000/cart";

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
                    <select id="quantity-dropdown" onChange={handleDropdownChange}>
                        <option value={quantity}>{quantity}</option>
                        {quantity > 5 && [...Array(quantity)].map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                        {quantity <= 5 && [...Array(5)].map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>
                <p className="product-price">{price * quantity}€</p>
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