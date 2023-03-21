import './App.css';
import NavigationBar from "./components/NavigationBar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages';
import Cart from './pages/cart';
import Login from './pages/login';
import Signup from './pages/signup';
import Products from './pages/products';
import jwtDecode from "jwt-decode";


function App() {
    const token = localStorage.getItem("jwt-token");
    var loggedIn = false
    if (token) {
        var decodedToken = jwtDecode(token)
        var dateNow = new Date();
        if(decodedToken.exp*1000 > dateNow.getTime()) {
            loggedIn = true;
        } else {
            loggedIn = false;
        }
    }

  return (
      <Router>
        <NavigationBar  loggedIn={loggedIn}/>
        <Routes>
          <Route exact path='/' exact element={<Home />} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/products' element={<Products/>} />
        </Routes>
      </Router>
  );
}

export default App;
