import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// actions
import { getCategories } from '../../redux/actions/categoryActions';

// styling
import './sidebar.scss';

class SideMenuBar extends Component {

  componentDidMount() {
    const { getCategories } = this.props;
    getCategories();
  }

  render() {
    const { categories, fetchingCategories } = this.props;
    return (
        <nav className="sidebar-wrapper">
            <hr />
            <div className="sidebar-brand">
              <Link to="/"> <em>Swavy-Tees</em> </Link>
              <div id="close-sidebar">
                <i className="fa fa-close"></i>
              </div>
            </div>
            <div className="sidebar-search">
              <div>
                <div className="input-group">
                  <input type="text" className="form-control search-menu" placeholder="Search..." />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="sidebar-menu">
              <div className="sidebar-categories">CATEGORIES</div>
              {
                fetchingCategories ? <div>Loding...</div>
                  : <ul>
                  { categories.map((category) => {
                    const { id, name } = category;
                    return (
                      <li className="categories-li" key={id}>
                        <Link to={`/category/${name}`}> <span> {name} </span> </Link>
                      </li>
                  )}) }
                </ul>
              }
                <hr />
                <div className="sidebar-categories">DEPARTMENTS</div>
              <ul>
                <li className="categories-li">
                  <Link to="/"> <span>Nature</span> </Link>
                </li>
                <li className="categories-li">
                  <Link to="/"> <span>Regional</span> </Link>
                </li>
                <li className="categories-li">
                  <Link to="/"> <span>Seasonal</span> </Link>
                </li>
              </ul>
            </div>
        </nav>
    )
  }
}

SideMenuBar.propTypes = {
  getCategories: PropTypes.func.isRequired,
  fetchingCategories: PropTypes.bool.isRequired,
  categories: PropTypes.array,
};

SideMenuBar.defaultProps = {
  categories: []
}

const actionCreators = {
  getCategories
};

export const mapStateToProps = ({ categories }) => ({
  categories: categories.categories,
  fetchingCategories: categories.fetchingCategories
});

export default connect( mapStateToProps, actionCreators)(SideMenuBar);
