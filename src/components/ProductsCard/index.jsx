import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './productsCard.scss';

const imageUrlPrefix = process.env.REACT_APP_CLOUDINARY_URL;

class ProductsCard extends Component {
  render() {
    const { products } = this.props;
    return (
      <div className="products-container">
        {products && products.length ? products.map((product) => {
          const { product_id, name, price, discounted_price, image } = product;
          return (
            <Link key={product_id} className="product-details-link card product-card" to={`/product/${product_id}`}>
              <div className="view-product">
                <img className="card-img-top" src={`${imageUrlPrefix}/${image}`} alt="Card cap"/>
              </div>
              <div className="card-body">
                <p className="card-title"> { name } </p>
                <span className="card-text">${ discounted_price > 0 ? discounted_price : price }</span>
                <span className="card-text real-price">{ discounted_price > 0 ? `$${price}` : '' }</span>
                <hr />
                <button to="/product-details" className="btn btn-success">
                  Details <i className="fa fa-info-circle"></i>
                </button>
              </div>
            </Link>
          )}) : null }
      </div>
    )
  }
}

ProductsCard.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductsCard;
