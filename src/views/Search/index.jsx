import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// actions
import { searchByKeyword } from '../../redux/actions/categoryActions';

// components
import ProductsCard from '../../components/ProductsCard';
import SubHeader from '../../components/SubHeader';
import Loader from '../../components/Loader/index';

class Search extends Component {
  state = {
    searchTerm: null,
    currentPage: 1
  }

  componentDidMount() {
    const { searchByKeyword, match: { params: { input: searchTerm } } } = this.props;
    const { currentPage } = this.state;
    searchByKeyword(searchTerm, currentPage);
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
      searchByKeyword(newSearchTerm, 1);
    }
  }

  handleSearchPagination = async (event) => {
    await this.setState({ currentPage: Number(event.target.id) });
    const { currentPage } = this.state;
    const { searchByKeyword, match: { params: { input: newSearchTerm } } } = this.props;
    searchByKeyword(newSearchTerm, currentPage);
  }

  renderPagination = (pageNumbers, searchInput, currentPage) => {
    return (
      <div className="text-center pagination-div">
        <ul className="pagination-ul list-group">
          {pageNumbers.map((number) => {
            return (
              <Link 
                to={`/keyword/${searchInput}/${number}`}
                key={ number }
                id={ number }
                className={`pagination-list list-group-item ${currentPage === number ? `is-active` : ''}`}
                onClick={ this.handleSearchPagination }
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
    const { fetchingCategories, products, subHeaderTitle, paginationData } = this.props;
    const subHeaderMessage = `Your Search Results for ${ this.props.match.params.input }`;
    const { limit, total, keyword } = paginationData;
    const pageNumbers = [];
    for (let index = 1; index <= Math.ceil(total / limit); index++) {
      pageNumbers.push(index);
    }
    const { currentPage } = this.state;
    return (
      <div>
        {
          fetchingCategories ? <Loader />
          : <div>
              <SubHeader
                subHeaderMessage={ products.length > 0 ? subHeaderMessage : '' }
                subHeaderTitle={subHeaderTitle}
              />
              { this.renderPagination(pageNumbers, keyword, currentPage) }
              {
                products.length > 0 ? <ProductsCard
                  products={products}
                /> : <div className="jumbotron text-center">
                        Sorry, we have no result for your search: <strong>{ this.props.match.params.input }</strong>
                      </div>
              }
              { this.renderPagination(pageNumbers, keyword, currentPage) }
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
}

const actionCreators = {
  searchByKeyword
};

export const mapStateToProps = ({ categories }) => ({
  products: categories.products.products,
  fetchingCategories: categories.fetchingCategories,
  paginationData: categories.products
});

export default connect( mapStateToProps, actionCreators)(Search);
