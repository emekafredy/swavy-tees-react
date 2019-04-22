import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './productsCard.scss';

class ProductsCard extends Component {
  render() {
    const { products } = this.props;
    return (
      <div className="products-container">
        {products.map((product) => {
          const { id, name, price, discountedPrice } = product;
          return (
            <Link key={id} className="product-details-link card product-card" to={`/product/${id}`}>
              <div className="view-product">
                <img className="card-img-top" src="https://images.bewakoof.com/original/marshmello-mask-half-sleeve-t-shirt-men-s-printed-t-shirts-181065-1521616951.jpg" alt="Card cap"/>
              </div>
              <div className="card-body">
                <p className="card-title"> { name } </p>
                <span className="card-text">${ (price - discountedPrice).toFixed(2) }</span>
                <span className="card-text real-price">{ discountedPrice > 0 ? `$${price}` : '' }</span>
                <hr />
                <button to="/product-details" className="btn btn-success">
                  Details <i className="fa fa-info-circle"></i>
                </button>
              </div>
            </Link>
          )})}
      </div>
    )
  }
}

ProductsCard.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductsCard;
