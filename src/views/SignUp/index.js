import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './signUp.scss';

import { authenticateUser } from '../../redux/actions/authActions';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { authenticateUser } = this.props;
    const { name, email, password, confirmPassword } = this.state;
    const newUser = { name, email, password, confirmPassword }
    authenticateUser(newUser);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillUnmount() {
    this.setState({ errors: {} });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.auth.isAuthenticated) {
      props.history.push('/');
    }
    return { errors: props.auth.errors }
  }

  render() {
    const { errors } = this.state;
    const { auth: { authenticating } } = this.props;
    return (
      <div className="card-body sign-up-card">
        <h5 className="card-title text-center">Register</h5>
        <p className="text-center">Every field is required</p>
        <form className="form-signin" onSubmit={ this.handleSubmit }>
          <div className="form-label-group">
            <input 
              type="text"
              id="name"
              className="form-control"
              placeholder="Name"
              required
              name="name"
              value={ this.state.name }
              onChange={ this.handleChange }
            />
            <label htmlFor="name">Name</label>
            { errors.name ? (<p className="error-display"> { errors.name } </p>) : '' }
          </div>

          <div className="form-label-group">
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
              name="email"
              value={ this.state.email }
              onChange={ this.handleChange }
            />
            <label htmlFor="email">Email address</label>
            { errors.email ? (<p className="error-display"> { errors.email } </p>) : '' }
          </div>
          
          <hr />

          <div className="form-label-group">
            <input 
              type="password"
              id="password"
              className="form-control"
              placeholder="password"
              required
              name="password"
              value={ this.state.password }
              onChange={ this.handleChange }
            />
            <label htmlFor="password">password</label>
            { errors.password ? (<p className="error-display"> { errors.password } </p>) : '' }
          </div>
          
          <div className="form-label-group">
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirm password"
              required
              name="confirmPassword"
              value={ this.state.confirmPassword }
              onChange={ this.handleChange }
            />
            <label htmlFor="confirmPassword">Confirm password</label>
            { errors.confirmPassword ? (<p className="error-display"> { errors.confirmPassword } </p>) : '' }
          </div>

          <button className="btn btn-lg btn-success btn-block" type="submit" disabled={authenticating}>
            { authenticating ? <i className="fa fa-spinner fa-spin"></i> : ''}
            Register
          </button>
          <Link className="d-block text-center mt-2 small" to="/login">Sign In Instead</Link>
        </form>
      </div>
    )
  }
}

SignUp.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const actionCreators = {
  authenticateUser
};

export const mapStateToProps = ({ auth }) => ({
 auth
});

export default connect( mapStateToProps, actionCreators)(SignUp);
