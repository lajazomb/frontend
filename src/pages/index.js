import React, {useEffect, useState} from 'react';
import ProductList from "../components/Products/ProductList";

const Home = () => {
    const [products, setProducts] = useState([]);

    const loadProducts = () => {
        fetch('http://localhost:28081/api/v1/products')
            .then(response => response.json())
            .then(data => {
                const randomProducts = data.sort(() => 0.5 - Math.random()).slice(0, 4);
                setProducts(randomProducts);
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        loadProducts();
    }, []);


    return (
        <div className="landing-page-content">
            <div className="landing-page-slider">
                <div className="landing-page-quote-container">
                    <h1 className="landing-page-quotes">“The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.”</h1>
                </div>
            </div>
            <h1>Today's Recommendations</h1>
            <div className="product-page-row">
                {products && <ProductList products={products} />}
            </div>
            <a href="/products"><button className="explore-button">Explore more books...</button></a>
        </div>
    );
};

export default Home;