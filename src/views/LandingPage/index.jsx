import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// actions
import { getProducts } from '../../redux/actions/productActions';

// components
import ProductsCard from '../../components/ProductsCard';
import SubHeader from '../../components/SubHeader';
import Loader from '../../components/Loader/index';

import './landingPage.scss';

class LandingPage extends Component {
  state = { currentPage: 1 }
  componentDidMount() {
    const { getProducts } = this.props;
    const { currentPage } = this.state;
    getProducts(currentPage);
  }

  handlePagination = async (event) => {
    await this.setState({ currentPage: Number(event.target.id) });
    const { currentPage } = this.state;
    const { getProducts } = this.props;
    getProducts(currentPage);
  }

  static getDerivedStateFromProps(props, state) {
    const { match: { path } } = props;
    if (path === '/') {
      return {
        currentPage: 1
      }
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { match: { path } } = prevProps;
    const {getProducts, match: { path: newPath } } = this.props;
    const { currentPage } = this.state;
    if (path !== newPath) {
      getProducts(currentPage);
    }
  }

  renderPagination = (pageNumbers, currentPage) => {
    return (
      <div className="text-center pagination-div">
        <ul className="pagination-ul list-group">
          {pageNumbers.map((number) => {
            return (
              <Link 
                to={`/products/page/${number}`}
                key={ number }
                id={ number }
                className={`pagination-list list-group-item ${currentPage === number ? `is-active` : ''}`}
                onClick={ this.handlePagination }
              > 
                { number } 
              </Link>
            )
          })}
        </ul>
      </div>
    )
  }

  render() {
    const { products, fetchingProducts, paginationData } = this.props;
    const { limit, total } = paginationData;
    const pageNumbers = [];
    for (let index = 1; index <= Math.ceil(total / limit); index++) {
      pageNumbers.push(index);
    }
    const { currentPage } = this.state;

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
              { this.renderPagination(pageNumbers, currentPage) }
              <ProductsCard
                products={products}
              />
              { this.renderPagination(pageNumbers, currentPage) }
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
  products: [],
}

const actionCreators = {
  getProducts
};

export const mapStateToProps = ({ products }) => ({
  products: products.products.products,
  fetchingProducts: products.fetchingProducts,
  paginationData: products.products
});

export default connect( mapStateToProps, actionCreators)(LandingPage);
