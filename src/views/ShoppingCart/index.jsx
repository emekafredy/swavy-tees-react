import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getCart, updateCart, deleteCart, clearCart } from '../../redux/actions/cartActions';
import Loader from '../../components/Loader/index';

import './shoppingCart.scss';

const imageUrlPrefix = process.env.REACT_APP_CLOUDINARY_URL;
class ShoppingCart extends Component {
  state = {
    quantity: null,
    cartId: null,
  }

  componentDidMount() {
    const { getCart } = this.props;
    getCart()
  }

  handleUpdate = async (e) => {
    e.preventDefault();
    const { updateCart } = this.props;
    await this.setState({ cartId: Number(e.target.name), quantity: Number(e.target.value) });
    await updateCart(this.state.cartId, this.state.quantity);
  }

  handleDeleteProductInCart = (cartId) => {
    const { deleteCart } = this.props;
    deleteCart(cartId)
  }

  handleClearCart = () => {
    const { clearCart } = this.props;
    clearCart()
  }

  render() {
    const { cart, fetchingCart, deletingProduct, updatingCart } = this.props;
    return (
      <div>
        {
          fetchingCart ? <Loader /> 
            : <div className="container text-center">
                <div className="text-center">
                  <hr className="first-cart-hr"/>
                  <h2><em>My Cart</em></h2>
                  <hr className="second-cart-hr"/>
                </div>     
                <table className="table-fill">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cart.cart ? cart.cart.map((item) => {
                        return (
                          <tr key={ item.id }>
                            <td>
                              <img src={`${imageUrlPrefix}/${item.product.thumbnail}`} alt=""/>
                            </td>
                            <td> { item.product.name } </td>
                            <td>
                              <select
                                name={ item.id }
                                value={ item.quantity }
                                onChange={ this.handleUpdate }
                                disabled={ updatingCart }
                              >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => {
                                  return (
                                    <option key={ number } value={ number }> {number} </option>
                                  )
                                })}
                              </select>
                            </td>
                            <td> ${ item.product.productTotalPrice.toFixed(2) } </td>
                            <td>
                              <button 
                                className="btn btn-danger"
                                disabled={deletingProduct}
                                onClick={() => this.handleDeleteProductInCart(item.id)}
                              >
                                <i className="fa fa-remove"></i>
                              </button>
                            </td>
                          </tr>
                        )
                      }) : null 
                    }
                  </tbody>
                </table>
                <hr/> <hr/>               
                <div className="cart-bottom-display">
                  <div className="cart-left-pane">
                    <button
                      disabled={ deletingProduct }
                      className="btn btn-danger"
                      onClick={ this.handleClearCart }
                    >
                      { deletingProduct ? <i className="fa fa-spinner fa-spin"></i> : ''}
                      Clear Cart <span/>
                      <i className="fa fa-trash"></i>
                    </button>
                    <Link 
                      className="btn btn-success"
                      to="/checkout"
                    >
                      Checkout
                    </Link>
                  </div>
                  <div className="cart-right-pane">
                    <p className="sum-title"> Total Quantity: 
                      <span className="bolden-value"> { cart.totalItems } </span> 
                    </p>
                    <p className="sum-title"> Total Price: 
                      <span className="bolden-value"> ${ cart.subTotalPrice && cart.subTotalPrice.toFixed(2) } </span>
                    </p>
                    <p className="sum-title"> Total Discount:
                      <span className="bolden-value"> ${ cart.discount && cart.discount.toFixed(2) } </span>
                    </p>
                    <p className="sum-title"> Final Price:  
                      <span className="bolden-value"> ${ cart.totalPrice && cart.totalPrice.toFixed(2) } </span>
                    </p>
                  </div>
                </div>
              </div>
        }
      </div>
    )
  }
}

ShoppingCart.propTypes = {
  getCart: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
  fetchingCart: PropTypes.bool.isRequired,
  updateCart: PropTypes.func.isRequired,
  deleteCart: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  updatingCart: PropTypes.bool.isRequired,
};

const actionCreators = {
  getCart,
  updateCart,
  deleteCart,
  clearCart
};

export const mapStateToProps = ({ cart }) => ({
  cart: cart.products,
  fetchingCart: cart.fetchingCart,
  deletingProduct: cart.deletingProduct,
  updatingCart: cart.updatingCart
});

export default connect( mapStateToProps, actionCreators)(ShoppingCart);
