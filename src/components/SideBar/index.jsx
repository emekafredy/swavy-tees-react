import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// actions
import { getCategories, getDepartments } from '../../redux/actions/categoryActions';

// styling
import './sidebar.scss';

class SideMenuBar extends Component {
  state = {
    showMenu: false,
    departmentId: 0,
    categoryId: 0
  }
  componentDidMount() {
    const { getCategories, getDepartments } = this.props;
    getCategories();
    getDepartments();
  }

  showMenu = (event, deptId) => {
    event.preventDefault();
    this.setState({
      departmentId: deptId,
      showMenu: true
    });
    const { history } = this.props;
    history.push(`/products/departments/${deptId}`)
  }

  setCategoryId = (event, catId, name) => {
    event.preventDefault();
    this.setState({ categoryId: catId });
    const { history } = this.props;
    history.push(`/category/${name}`)
  }

  render() {
    const { departments, fetchingDepartments } = this.props;
    const { departmentId, categoryId } = this.state;
    return (
        <nav className="sidebar-wrapper">
            <hr />
            <div className="sidebar-brand">
              <Link to="/"> <em>Swavy-Tees</em> </Link>
            </div>          
            <div className="sidebar-menu">
                <div className="sidebar-categories">DEPARTMENTS</div>
                {
                  fetchingDepartments ? <div> Loading... </div>
                  : <ul>
                      { departments.map((department) => {
                        const { department_id, name } = department;
                        return (
                          <li 
                            className={`categories-li `} 
                            key={ department_id }
                          >
                            <button
                              className={`dept-btn ${department_id === departmentId ? 'active-background' : ''}`}
                              onClick={(e) => this.showMenu(e, department_id)}
                              value={ department_id }
                            > 
                              <i className="fa fa-arrow"></i>
                              <span> { name.toUpperCase() } </span> 
                            </button>
                          </li>
                        )
                      }) }
                    </ul>
                }
                <hr/>
                <hr/>
                <hr/>
                <div>
                  <ul>
                    {
                      this.state.showMenu
                      ? <div className="category-div">
                          <div className="sidebar-categories">CATEGORIES</div>
                          {departments.map((department) => {
                            return department.Categories.map((category) => {
                              const { department_id, category_id, name } = category;
                              if (department_id === departmentId) {
                                return (
                                    <button
                                      key={category_id}
                                      onClick={(e) => this.setCategoryId(e, category_id, name)}
                                      className={`my-category-menu ${category_id === categoryId ? 'active-category' : ''}`}
                                    > 
                                      <span> { category.name } </span> 
                                    </button>
                                  
                                )
                              }
                              return null;
                            })
                          })}
                      </div> : null
                    }
                  </ul>
                </div>
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
