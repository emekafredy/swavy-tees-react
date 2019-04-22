import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// actions
import { getProducts } from '../../redux/actions/productActions';

// components
import ProductsCard from '../../components/ProductsCard';
import SubHeader from '../../components/SubHeader';
import Loader from '../../components/Loader/index';

class LandingPage extends Component {

  componentDidMount() {
    const { getProducts } = this.props;
    getProducts();
  }

  render() {
    const { products, fetchingProducts } = this.props;
    const subHeaderMessage = ` Welcome to our "one-stop" online shop for everything polo. We have the best in terms of quality, and guess what?
    They are very much affordable as well. We give a lot at discounted price. We believe our customers deserve the best.`;
    const subHeaderTitle = 'Welcome';
    return (
      <div>
        {
          fetchingProducts ? <Loader />
          : <div>
              <SubHeader
                subHeaderMessage={subHeaderMessage}
                subHeaderTitle={subHeaderTitle}
              />
              <ProductsCard
                  products={products}
                />
            </div>
        }
      </div>
    )
  }
}

LandingPage.propTypes = {
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.array,
  fetchingProducts: PropTypes.bool.isRequired,
};

LandingPage.defaultProps = {
  products: []
}

const actionCreators = {
  getProducts
};

export const mapStateToProps = ({ products }) => ({
  products: products.products,
  fetchingProducts: products.fetchingProducts,
});

export default connect( mapStateToProps, actionCreators)(LandingPage);
