import React, {useEffect, useState, componentDidMount} from "react";
import axios from 'axios';
import ProductList from "../components/Products/ProductList";

export default class products extends React.Component {
    state = {
        products: [],
        isLoading: false,
        errorMsg: ''
    };

    componentDidMount() {
        this.setState({ isLoading: true });
        axios
            .get('http://localhost:28081/api/v1/products')
            .then((response) => {
                this.setState({ products: response.data, errorMsg: '' });
            })
            .catch((error) =>
                this.setState({
                    errorMsg: 'Error while loading data. Try again later.'
                })
            )
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    render() {
        const { products, isLoading, errorMsg } = this.state;
        return (
            <div className="main-section">
                {isLoading && <p className="loading">Loading...</p>}
                {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                <ProductList products={products} />
            </div>
        );
    }
}