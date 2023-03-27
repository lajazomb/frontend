import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import withRouter from "../withRouter";

const Details = () => {
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();

    const handleChange = (e) => {
        setQuantity(e.target.value);
    };

    const getJwtToken = () => {
        const token = localStorage.getItem('jwt-token');
        if (token === null) {
            return null;
        }
        const decodedToken = jwtDecode(token);
        const dateNow = new Date();
        if (decodedToken.exp * 1000 < dateNow.getTime()) {
            localStorage.removeItem('jwt-token');
            return null;
        }
        return decodedToken;
    };

    const addToCart = () => {
        const decodedToken = getJwtToken();
        if (decodedToken === null) {
            setErrorMsg('Error: you need to be logged in to add items to cart.');
            return;
        }

        const userId = decodedToken.userid;
        const data = { userId, productId: id, quantity };
        axios
            .post('http://localhost:28080/api/v1/cart', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setSuccessMsg('Product added to cart.');
                }
            })
            .catch((error) => setErrorMsg('Error: product could not be added to cart.'));
    };

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`http://localhost:28081/api/v1/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setErrorMsg('');
            })
            .catch((error) => setErrorMsg('Error: product not found.'))
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    return (
        <div className="content">
            {isLoading && <p className="loading">Loading...</p>}

            <div className="cover-container">
                <img src={product.cover} alt={product.title} />
            </div>

            <div className="product-details-container">
                <div className="product-details">
                    <h2>{product.authors}</h2>
                    <h1>{product.title}</h1>
                    <h2>Description</h2>
                    <p>{product.description}</p>
                </div>

                <div className="add-to-cart-container">
                    <select className="quantity-dropdown" name="quantity" id="quantity" onChange={handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button onClick={addToCart} style={{ marginTop: '0px' }} className="submit-button">
                        Add to cart
                    </button>
                </div>
                {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                {successMsg && <p className="successMsg">{successMsg}</p>}
            </div>
        </div>
    );
};
export default withRouter(Details);
