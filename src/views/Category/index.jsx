import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// actions
import { getCategory } from '../../redux/actions/categoryActions';

// components
import ProductsCard from '../../components/ProductsCard';
import SubHeader from '../../components/SubHeader';
import Loader from '../../components/Loader/index';

class Category extends Component {
  state = { searchTerm: null }

  componentDidMount() {
    const { getCategory, match: { params: { name: searchTerm } } } = this.props;
    getCategory(searchTerm);
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
      getCategory(newSearchTerm);
    }
  }

  render() {
    const { fetchingCategory, products, subHeaderMessage, subHeaderTitle } = this.props;
    return (
      <div>
        {
          fetchingCategory ? <Loader />
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
  subHeaderMessage: categories.category.categoryDescription
});

export default connect( mapStateToProps, actionCreators)(Category);
