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
    errors: {}
  }

  selectColor = (id) => {
    this.setState({ colorId: id });
  }

  selectSize = (id) => {
    this.setState({ sizeId: id });
  }

  handleAddToCart = (productId) => {
    const { addToCart, auth, history } = this.props;
    if (auth.isAuthenticated) {
      const { sizeId, colorId } = this.state;
      const attributes = { sizeId, colorId }
      addToCart(productId, attributes);
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
                    className={`btn my-btns btn-${color.value}`}
                    key={color.id}
                    onClick={() => this.selectColor(color.id)}
                  />
                )
              })}
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
                    onClick={() => this.selectSize(size.id)}
                  > 
                    {size.value}
                  </button>
                )
              })}
            </div>
            <hr />
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
