import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// actions
import { getProductsByDepartment } from '../../redux/actions/categoryActions';

// components
import ProductsCard from '../../components/ProductsCard';
import SubHeader from '../../components/SubHeader';
import Loader from '../../components/Loader/index';

import '../LandingPage/landingPage.scss';

class DepartmentProducts extends Component {
  state = {
    departmentId: null,
    currentPage: 1,
    limit: 9
  }

  componentDidMount() {
    const { getProductsByDepartment, match: { params: { id: departmentId } } } = this.props;
    getProductsByDepartment(departmentId);
  }

  static getDerivedStateFromProps(props, state) {
    const { match: { params: { id: newDepartmentId } } } = props;
    if (state.departmentId !== newDepartmentId) {
      return {
        departmentId: props.match.params.id
      }
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { match: { params: { id: oldDepartmentId } } } = prevProps;
    const { getProductsByDepartment, match: { params: { id: newDepartmentId } } } = this.props;
    if (oldDepartmentId !== newDepartmentId) {
      getProductsByDepartment(newDepartmentId);
    }
  }

  handleSearchPagination = async (event) => {
    await this.setState({ currentPage: Number(event.target.id) });
    const { getProductsByDepartment, match: { params: { id: departmentId } } } = this.props;
    getProductsByDepartment(departmentId);
  }

  renderPagination = (pageNumbers, currentPage) => {
    return (
      <div className="text-center pagination-div">
        <ul className="pagination-ul list-group">
          {pageNumbers.map((number) => {
            return (
              <button 
                key={ number }
                id={ number }
                className={`pagination-list list-group-item ${currentPage === number ? `is-active` : ''}`}
                onClick={ this.handleSearchPagination }
              > 
                { number } 
              </button>
            )
          })}
        </ul>
      </div>
    )
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
              <ProductsCard
                products={products}
              />
            </div>
        }
      </div>
    )
  }
}

DepartmentProducts.propTypes = {
  getProductsByDepartment: PropTypes.func.isRequired,
  products: PropTypes.array,
  fetchingCategories: PropTypes.bool.isRequired,
  subHeaderTitle: PropTypes.string,
  subHeaderMessage: PropTypes.string,
};

DepartmentProducts.defaultProps = {
  products: [],
  subHeaderTitle: '',
  subHeaderMessage: ''
}

const actionCreators = {
  getProductsByDepartment
};

export const mapStateToProps = ({ categories }) => ({
  products: categories.products.products,
  fetchingCategories: categories.fetchingCategories,
  subHeaderTitle: categories.products.departmentName,
  subHeaderMessage: categories.products.departmentDescription,
});

export default connect( mapStateToProps, actionCreators)(DepartmentProducts);
