import React from 'react';
import ProductContainer from "./ProductContainer";

const ProductList = ({ products }) => {
    return (
        <div className="product-page-content">
            {products && products.map((product) => <ProductContainer key={products.id} {...product} />)}
        </div>
    );
};

export default ProductList;