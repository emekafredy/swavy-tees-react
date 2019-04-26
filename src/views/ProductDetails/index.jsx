import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// actions
import { getProduct } from '../../redux/actions/productActions';
import { addToCart } from '../../redux/actions/cartActions';

// component
import Loader from '../../components/Loader/index';

import './productDetails.scss';

class ProductDetails extends Component {
  state = {
    sizeId: '',
    colorId: '',
    color: '',
    size: '',
    errors: {},
    quantity: 1
  }

  selectColor = (e, id) => {
    this.setState({ colorId: id, color: e.target.value });
  }

  selectSize = (e, id) => {
    this.setState({ sizeId: id, size: e.target.value });
  }

  handleQuantityIncrement = () => this.setState({quantity: (this.state.quantity + 1)})
  handleQuantityDecrement = () => this.setState({quantity: (this.state.quantity - 1)})

  handleAddToCart = (productId) => {
    const { addToCart, auth, history } = this.props;
    if (auth.isAuthenticated) {
      const { sizeId, colorId, quantity } = this.state;
      addToCart(productId, { sizeId, colorId, quantity });
    } else {
      history.push('/login');
    }
  }

  componentDidMount() {
    const { getProduct, match: { params: { id } } } = this.props;
    getProduct(id);
  }

  render() {
    const { product, fetchingProduct, addingToCart } = this.props;
    const { quantity } = this.state;
    return (
      <div>
      {
        fetchingProduct ? <Loader />
          : <div className="row product-details-page">
          <div className="col-md-5 product-details-column col-md-offset-2 text-center">
            <hr />
            <h4 className="product-name"> {product.name} </h4>
            <hr />
            <img src="https://images.bewakoof.com/original/marshmello-mask-half-sleeve-t-shirt-men-s-printed-t-shirts-181065-1521616951.jpg" alt=""/>
          </div>
          <div className="col-md-5 product-details-column col-md-offset-2">
            <hr />
            <p> { product.description } </p>
            <span className="final-price"> ${ (product.price - product.discountedPrice).toFixed(2) } </span>
            <span className="product-price"> { product.discountedPrice > 0 ? `$${product.price}` : ''  } </span>
            <hr />
            <div>
              <span className="color-title"> COLORS:   </span>
              {product.colors.map(color => {
                return (
                  <button
                    className={`btn my-btns btn-${color.value} ${this.state.clicked ? 'override-btn-size' : ''}`}
                    key={color.id}
                    onClick={(e) => this.selectColor(e, color.id)}
                    value={ color.value }
                  />
                )
              })}
              <p> 
                Selected: <span className={`selected-product-value text-${this.state.color}`}> { this.state.color } </span>  
              </p>
              <hr />
            </div>
            <hr />
            <div>
              <span className="size-title"> SIZES: </span>
              {product.sizes.map(size => {
                return (
                  <button
                    className="btn btn-info my-btns2"
                    key={size.id}
                    onClick={(e) => this.selectSize(e, size.id)}
                    value={ size.value }
                  > 
                    {size.value}
                  </button>
                )
              })}
              <p> 
                Selected: <span className="selected-product-value"> { this.state.size } </span>  
              </p>
            </div>
            <hr />
            <hr/>
            <div>
              <span className="size-title"> QUANTITY: </span>
              <button 
                className="input-number-decrement" 
                disabled={ quantity === 1 }
                onClick={ this.handleQuantityDecrement }
              >–</button>
              <input 
                className="input-number" 
                type="text" 
                value={ quantity }
                disabled
              />
              <button 
                className="input-number-increment" 
                disabled={ quantity === 10 }
                onClick={ this.handleQuantityIncrement }
              >+</button>
            </div>
            <hr/>
            <Link
              className="btn btn-primary my-cart-btn"
              to="/my-cart"
            >
              My Cart <i className="fa fa-shopping-cart"></i>
            </Link>
            <button
              className="btn btn-success add-to-cart-btn"
              disabled={addingToCart}
              onClick={() => this.handleAddToCart(product.id)}
            >
              { addingToCart ? <i className="fa fa-spinner fa-spin"></i> : ''}
              Add to cart <i className="fa fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      }
      </div>
    )
  }
}

ProductDetails.propTypes = {
  getProduct: PropTypes.func.isRequired,
  product: PropTypes.object,
  fetchingProduct: PropTypes.bool.isRequired,
  addToCart: PropTypes.func.isRequired,
  addingToCart: PropTypes.bool.isRequired,
  auth: PropTypes.object,
};

const actionCreators = {
  getProduct,
  addToCart
};

export const mapStateToProps = ({ products, auth, cart }) => ({
  product: products.product.product,
  fetchingProduct: products.fetchingProduct,
  auth,
  addingToCart: cart.addingToCart
});

export default connect( mapStateToProps, actionCreators)(ProductDetails);
