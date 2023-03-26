import React from 'react';

const Home = () => {
    return (
        <div className="landing-page-content">
            <div className="landing-page-slider">
                <div className="landing-page-quote-container">
                    <h1 className="landing-page-quotes">“The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.”</h1>
                </div>
            </div>
            <h1>Today's Recommendations</h1>
            <div className="product-page-row">
                <div className="product-container">
                    <div className="product-image-container">
                        <img/>
                    </div>
                    <div className="product-description-container">
                        <h4>Book Title</h4>
                        <p>ISBN</p>
                    </div>
                </div>
                <div className="product-container">
                    <div className="product-image-container">
                        <img/>
                    </div>
                    <div className="product-description-container">
                        <h4>Book Title</h4>
                        <p>ISBN</p>
                    </div>
                </div>
                <div className="product-container">
                    <div className="product-image-container">
                        <img/>
                    </div>
                    <div className="product-description-container">
                        <h4>Book Title</h4>
                        <p>ISBN</p>
                    </div>
                </div>

                <div className="product-container">
                    <div className="product-image-container">
                        <img/>
                    </div>
                    <div className="product-description-container">
                        <h4>Book Title</h4>
                        <p>ISBN</p>
                    </div>
                </div>

            </div>
            <a href="/products"><button className="explore-button">Explore more books...</button></a>
        </div>
    );
};

export default Home;