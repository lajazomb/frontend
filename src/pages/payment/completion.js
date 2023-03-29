import jwtDecode from "jwt-decode";
import {useEffect} from "react";

const Completion = () => {
    const decodedJwtToken = jwtDecode(localStorage.getItem('jwt-token'));
    const name = decodedJwtToken.firstName;

    useEffect(() => {
        clearCart();
    }, []);

    const clearCart = () => {
        fetch('http://localhost:28080/api/v1/cart/user/' + decodedJwtToken.userid, {
            method: 'DELETE',
        })
    }

    return (
        <div className="book-background">
            <div className="completion-container glowing-border">
                <h1>Thanks for your order {name}! 🎉</h1>
                <div>
                    <img src="https://media.tenor.com/_4xCiEhhoZsAAAAM/dog-smile.gif" alt="test image" />
                </div>
                <h2>Have fun reading :)</h2>
            </div>
        </div>

    );
}

export default Completion;