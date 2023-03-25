import React from "react";

const ProductContainer = ({ id, title, author, price, isbn13 }) => {
    return (
        <a href={"/products/"+id}>
        <div className="product-container">
            <div className="product-image-container">
                <img/>
            </div>
            <div className="product-description-container">
                <h4>{title}</h4>
                <p style={{textDecoration: 'none'}}>{price} Euro</p>
            </div>
        </div>
        </a>
    );
};

export default ProductContainer;