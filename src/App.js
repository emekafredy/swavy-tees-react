import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

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
import NotFound from './components/ProtectRoutes/NotFound';
import Orders from './views/Orders';
import PrivateRoute from './components/ProtectRoutes/PrivateRoute';
import Search from './views/Search';
import DepartmentProducts from './views/Department';

axios.defaults.withCredentials = true;
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
                <Route exact path="/products/page/:id" component={ LandingPage } />
                <Route exact path="/login" component={ Login } />
                <Route exact path="/register" component={ SignUp } />
                <Route exact path="/product/:id" component={ ProductDetails } />
                <Route exact path="/category/:name" component={ Category } />
                <Route exact path="/category/:name/:id" component={ Category } />
                <Route exact path="/keyword/:input" component={ Search } />
                <Route exact path="/keyword/:input/:id" component={ Search } />
                <Route exact path="/products/departments/:id" component={ DepartmentProducts } />
                <Route path="/my-cart" component={ ShoppingCart } />
                <PrivateRoute path="/me" component={ UserProfile } />
                <PrivateRoute path="/checkout" component={ Checkout } />
                <PrivateRoute exact path="/orders" component={ Orders }/>
                <Route component={ NotFound } />
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
