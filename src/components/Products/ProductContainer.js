import React from "react";

const ProductContainer = ({ id, title, author, price, isbn13, coverUrl }) => {
    return (
        <a href={"/products/"+id} style={{textDecoration: 'none'}}>
        <div className="product-container">
            <div className="product-image-container">
                <img src={coverUrl} className="product-img" />
            </div>
            <div className="product-description-container">
                <h4>{title}</h4>
                <p>{price} Euro</p>
            </div>
        </div>
        </a>
    );
};

export default ProductContainer;