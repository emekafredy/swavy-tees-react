import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './navbar.scss';
import { logUserOut } from '../../redux/actions/authActions';
import { getCart } from '../../redux/actions/cartActions';

class NavBar extends Component {
  onLogoutClick(event) {
    event.preventDefault();
    const { logUserOut, history } = this.props;
    logUserOut();
    history.push('/');
  }

  componentDidMount() {
    const { getCart, auth } = this.props;
    if (auth.isAuthenticated) {
      getCart();
    }
  }

  render() {
    const { totalInCart, auth } = this.props;
    const { isAuthenticated, user } = auth;
    const authMenu = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="cart-link" to="/my-cart">
            <i className="fa fa-shopping-cart fa-2x cart-num"></i>
            <span className='badge badge-success' id='lblCartCount'> { totalInCart } </span>
            <span>Cart</span>
          </Link>
        </li>
        <div className="vl"></div>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle user-profile-dropdown" to="" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Hi, { user.firstName }
          </Link>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <Link className="dropdown-item" to="/me">Profile</Link>
            <Link className="dropdown-item" to="/orders">Orders</Link>
            <Link className="dropdown-item" to="/settings">Settings</Link>
            <hr />
            <Link className="dropdown-item" to="/" onClick={ this.onLogoutClick.bind(this) }>Log out</Link>
          </div>
        </li>
      </ul>
    );

    const menu = (
      <ul className="navbar-nav ml-auto">
        <div className="vl"></div>
        <li className="nav-item">
            <Link className="navbar-brand btn btn-outline-success" to="/login"> Login </Link>
        </li>
        <li className="nav-item">
            <Link className="navbar-brand btn btn-outline-success" to="/register"> Sign up </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">Swavy Tees</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search for products" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            { isAuthenticated ? authMenu : menu }
          </div>
        </div>
      </nav>
    )
  }
}

NavBar.propTypes = {
  logUserOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCart: PropTypes.func.isRequired,
  totalInCart: PropTypes.number,
}

NavBar.defaultProps = {
  totalInCart: 0
}

const mapStateToProps = ({ auth, cart }) => ({
  auth,
  totalInCart: cart.products.totalItems
})

const actionCreators = {
  logUserOut,
  getCart
};

export default connect( mapStateToProps, actionCreators)(withRouter(NavBar));
