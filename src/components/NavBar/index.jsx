import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './navbar.scss';
import { logUserOut } from '../../redux/actions/authActions';
import { getCart } from '../../redux/actions/cartActions';
import { getUserProfile } from '../../redux/actions/profileActions';

class NavBar extends Component {
  state = { inputValue: '' }
  onLogoutClick(event) {
    event.preventDefault();
    const { logUserOut, history } = this.props;
    logUserOut();
    history.push('/');
  }

  handleOnChange = (event) => {
    this.setState({ inputValue: event.target.value })
  }

  handleOnKeyDown = (event) => {
    const { history } = this.props;
    if (event.key === 'Enter') {
      history.push(`/keyword/${this.state.inputValue}`);
    }
  }

  componentDidMount() {
    const { getCart, auth, getUserProfile } = this.props;
    if (auth.isAuthenticated) {
      getCart();
      getUserProfile();
    }
  }

  render() {
    const { totalInCart, auth, user } = this.props;
    const { isAuthenticated } = auth;
    const { inputValue } = this.state;
    const authMenu = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="cart-link" to="/my-cart">
            <i className="fa fa-shopping-cart fa-2x cart-num"></i>
            { totalInCart !== 0 ? <span className='badge badge-success' id='lblCartCount'> { totalInCart } </span> : '' }
            <span>Cart</span>
          </Link>
        </li>
        <div className="vl"></div>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle user-profile-dropdown" to="" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Hi, { user.firstName || auth.user.firstName }
          </Link>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <Link className="dropdown-item" to="/me">Profile</Link>
            <Link className="dropdown-item" to="/orders">Orders</Link>
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
              <input 
                className="form-control mr-sm-2" 
                type="search"
                value= { this.state.inputValue }
                placeholder="Search for products" 
                aria-label="Search" 
                onChange={ this.handleOnChange }
                onKeyDown={ this.handleOnKeyDown }
              />
              <Link 
                className="btn btn-outline-success my-2 my-sm-0" 
                to={`/keyword/${inputValue}`}
              >
                Search
              </Link>
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
  getUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCart: PropTypes.func.isRequired,
  totalInCart: PropTypes.number,
  user: PropTypes.object.isRequired,
}

NavBar.defaultProps = {
  totalInCart: 0
}

const mapStateToProps = ({ auth, cart, profile }) => ({
  auth,
  totalInCart: cart.products.totalItems,
  user: profile.profile
})

const actionCreators = {
  logUserOut,
  getCart,
  getUserProfile
};

export default connect( mapStateToProps, actionCreators)(withRouter(NavBar));
