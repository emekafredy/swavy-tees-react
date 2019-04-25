import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import store from './redux/store';
import './App.css';

// functions to set token
import { setAuthToken } from './utils/setAuthToken';
import { setCurrentUser, logUserOut } from './redux/actions/authActions';

// Components
import NavBar from './components/NavBar';
import SideMenuBar from './components/SideBar';
import LandingPage from './views/LandingPage';
import Footer from './components/Footer';
import Login from './views/Login';
import SignUp from './views/SignUp';
import ProductDetails from './views/ProductDetails';
import Category from './views/Category';
import ShoppingCart from './views/ShoppingCart';
import UserProfile from './views/UserProfile';
import Checkout from './views/Checkout';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logUserOut());
    window.location.href = '/';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <div className="row page-row">
            <div className="col-sm-6 col-md-3 col-lg-3">
              <SideMenuBar />
            </div>
            <div className="col-sm-6 col-md-8 col-lg-8 main-page">
              <Switch>
                <Route exact path="/" component={ LandingPage } />
                <Route exact path="/login" component={ Login } />
                <Route exact path="/register" component={ SignUp } />
                <Route exact path="/product/:id" component={ ProductDetails } />
                <Route path="/category/:name" component={ Category } />
                <Route path="/my-cart" component={ ShoppingCart } />
                <Route path="/me" component={ UserProfile } />
                <Route path="/checkout" component={ Checkout } />
              </Switch>
            </div>
          </div>
          <Footer />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
