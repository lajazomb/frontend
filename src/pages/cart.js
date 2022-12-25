import React from 'react';

const Cart = () => {
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
                    <button className="cart-button-shopping">Continue Shopping</button>
                    <button className="cart-button-checkout">Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;