import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// actions
import { searchByKeyword } from '../../redux/actions/categoryActions';

// components
import ProductsCard from '../../components/ProductsCard';
import SubHeader from '../../components/SubHeader';
import Loader from '../../components/Loader/index';

class Search extends Component {
  state = { searchTerm: null }

  componentDidMount() {
    const { searchByKeyword, match: { params: { input: searchTerm } } } = this.props;
    searchByKeyword(searchTerm);
  }

  static getDerivedStateFromProps(props, state) {
    const { match: { params: { input: newSearchTerm } } } = props;
    if (state.searchTerm !== newSearchTerm) {
      return {
        searchTerm: props.match.params.input
      }
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { match: { params: { input: oldSearchTerm } } } = prevProps;
    const { searchByKeyword, match: { params: { input: newSearchTerm } } } = this.props;
    if (oldSearchTerm !== newSearchTerm) {
      searchByKeyword(newSearchTerm);
    }
  }

  render() {
    const { fetchingCategories, products, subHeaderMessage, subHeaderTitle } = this.props;
    return (
      <div>
        {
          fetchingCategories ? <Loader />
          : <div>
              <SubHeader
                subHeaderMessage={subHeaderMessage}
                subHeaderTitle={subHeaderTitle}
              />
              {
                products.length > 0 ? <ProductsCard
                  products={products}
                /> : <div className="jumbotron text-center">
                        Sorry, we have no result for your search: <strong>{ this.props.match.params.input }</strong>
                      </div>
              }
            </div>
        }
      </div>
    )
  }
}

Search.propTypes = {
  searchByKeyword: PropTypes.func.isRequired,
  products: PropTypes.array,
  fetchingCategories: PropTypes.bool.isRequired,
};

Search.defaultProps = {
  products: [],
  subHeaderTitle: '',
  subHeaderMessage: ''
}

const actionCreators = {
  searchByKeyword
};

export const mapStateToProps = ({ categories }) => ({
  products: categories.products,
  fetchingCategories: categories.fetchingCategories,
});

export default connect( mapStateToProps, actionCreators)(Search);
