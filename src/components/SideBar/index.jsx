import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// actions
import { getCategories, getDepartments } from '../../redux/actions/categoryActions';

// styling
import './sidebar.scss';

class SideMenuBar extends Component {
  state = { inputValue: '' }
  componentDidMount() {
    const { getCategories, getDepartments } = this.props;
    getCategories();
    getDepartments();
  }

  handleOnChange = (event) => {
    this.setState({ inputValue: event.target.value })
  }

  handleOnKeyDown = (event) => {
    const { history } = this.props;
    if (event.key === 'Enter') {
      history.push(`/keyword/${this.state.inputValue}`);
    }
  }

  render() {
    const { categories, fetchingCategories, departments, fetchingDepartments } = this.props;
    const { inputValue } = this.state;
    return (
        <nav className="sidebar-wrapper">
            <hr />
            <div className="sidebar-brand">
              <Link to="/"> <em>Swavy-Tees</em> </Link>
              <div id="close-sidebar">
                {/* <i className="fa fa-close"></i> */} 
              </div>
            </div>
            <div className="sidebar-search">
              <div>
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control search-menu" 
                    placeholder="Search..."
                    value = { this.state.inputValue }
                    onChange={ this.handleOnChange }
                    onKeyDown={ this.handleOnKeyDown }
                  />
                  <div className="input-group-append">
                    <Link className="input-group-text" to={`/keyword/${inputValue}`} >
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </Link>
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
                          <li className="categories-li" key={ id }>
                            <Link to={`/category/${name}`}> <span> { name } </span> </Link>
                          </li>
                      )}) }
                    </ul>
              }
                <hr />
                <div className="sidebar-categories">DEPARTMENTS</div>
                {
                  fetchingDepartments ? <div> Loading... </div>
                  : <ul>
                      { departments.map((department) => {
                        const { id, name } = department;
                        return (
                          <li className="categories-li" key={ id }>
                            <Link to="/"> <span> { name } </span> </Link>
                          </li>
                        )
                      }) }
                    </ul>
                }
            </div>
        </nav>
    )
  }
}

SideMenuBar.propTypes = {
  getCategories: PropTypes.func.isRequired,
  getDepartments: PropTypes.func.isRequired,
  fetchingCategories: PropTypes.bool.isRequired,
  categories: PropTypes.array,
  history: PropTypes.object.isRequired,
};

SideMenuBar.defaultProps = {
  categories: []
}

const actionCreators = {
  getCategories,
  getDepartments,
};

export const mapStateToProps = ({ categories }) => ({
  categories: categories.categories,
  fetchingCategories: categories.fetchingCategories,
  departments: categories.departments,
  fetchingDepartments: categories.fetchingDepartments
});

export default connect( mapStateToProps, actionCreators)(withRouter(SideMenuBar));
