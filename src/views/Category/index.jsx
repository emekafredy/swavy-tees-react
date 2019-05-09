import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// actions
import { getCategory } from '../../redux/actions/categoryActions';

// components
import ProductsCard from '../../components/ProductsCard';
import SubHeader from '../../components/SubHeader';
import Loader from '../../components/Loader/index';

import '../LandingPage/landingPage.scss';

class Category extends Component {
  state = {
    searchTerm: null,
    currentPage: 1
  }

  componentDidMount() {
    const { getCategory, match: { params: { name: searchTerm } } } = this.props;
    const { currentPage } = this.state;
    getCategory(searchTerm, currentPage);
  }

  static getDerivedStateFromProps(props, state) {
    const { match: { params: { name: newSearchTerm } } } = props;
    if (state.searchTerm !== newSearchTerm) {
      return {
        searchTerm: props.match.params.name
      }
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { match: { params: { name: oldSearchTerm } } } = prevProps;
    const { getCategory, match: { params: { name: newSearchTerm } } } = this.props;
    if (oldSearchTerm !== newSearchTerm) {
      getCategory(newSearchTerm, 1);
    }
  }

  handleCategoryPagination = async (event) => {
    await this.setState({ currentPage: Number(event.target.id) });
    const { currentPage } = this.state;
    const { getCategory, match: { params: { name: newSearchTerm } } } = this.props;
    getCategory(newSearchTerm, currentPage);
  }

  renderPagination = (pageNumbers, catgoryName, currentPage) => {
    return (
      <div className="text-center pagination-div">
        <ul className="pagination-ul list-group">
          {pageNumbers.map((number) => {
            return (
              <Link 
                to={`/category/${catgoryName}/${number}`}
                key={ number }
                id={ number }
                className={`pagination-list list-group-item ${currentPage === number ? `is-active` : ''}`}
                onClick={ this.handleCategoryPagination }
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
    const { fetchingCategory, products, subHeaderMessage, subHeaderTitle, paginationData } = this.props;
    const { limit, total, categoryName } = paginationData;
    const pageNumbers = [];
    for (let index = 1; index <= Math.ceil(total / limit); index++) {
      pageNumbers.push(index);
    }
    const { currentPage } = this.state;
    return (
      <div>
        {
          fetchingCategory ? <Loader />
          : <div>
              <SubHeader
                subHeaderMessage={subHeaderMessage}
                subHeaderTitle={subHeaderTitle}
              />
              { this.renderPagination(pageNumbers, categoryName, currentPage) }
              <ProductsCard
                products={products}
              />
              { this.renderPagination(pageNumbers, categoryName, currentPage) }
            </div>
        }
      </div>
    )
  }
}

Category.propTypes = {
  getCategory: PropTypes.func.isRequired,
  products: PropTypes.array,
  fetchingCategory: PropTypes.bool.isRequired,
  subHeaderTitle: PropTypes.string,
  subHeaderMessage: PropTypes.string,
};

Category.defaultProps = {
  products: [],
  subHeaderTitle: '',
  subHeaderMessage: ''
}

const actionCreators = {
  getCategory
};

export const mapStateToProps = ({ categories }) => ({
  products: categories.category.products,
  fetchingCategory: categories.fetchingCategory,
  subHeaderTitle: categories.category.categoryName,
  subHeaderMessage: categories.category.categoryDescription,
  paginationData: categories.category
});

export default connect( mapStateToProps, actionCreators)(Category);
