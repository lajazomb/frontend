import React, {useEffect, useState} from "react";

const CartItem = ({ productId, quantity }) => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("0.00€");

    const fetchProductData = async () => {
        try {
            const response = await fetch(`http://localhost:28081/products/${productId}`);
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            const data = await response.json();
            setProductName(data.title);
            setPrice(data.price);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, []);

    if (productName !== "" && price !== "0.00€") {
        return <div className="cart-item">
            <div className="name-quantity">
                <p className="product-name">{productName}</p>
                <select id="quantity-dropdown">
                    <option value="0">{quantity}</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <p className="product-price">{price}.00€</p>
        </div>
    }
};

export default CartItem;


