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
      firstName: '',
      lastName: '',
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
    const { firstName, lastName, email, password, confirmPassword } = this.state;
    const newUser = { firstName, lastName, email, password, confirmPassword }
    authenticateUser(newUser);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
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
              id="firstName"
              className="form-control"
              placeholder="First name"
              required
              name="firstName"
              value={ this.state.firstName }
              onChange={ this.handleChange }
            />
            <label htmlFor="firstName">First name</label>
            { errors.firstName ? (<p className="error-display"> { errors.firstName } </p>) : '' }
          </div>

          <div className="form-label-group">
            <input 
              type="text"
              id="lastName"
              className="form-control"
              placeholder="Last name"
              required
              name="lastName"
              value={ this.state.lastName }
              onChange={ this.handleChange }
            />
            <label htmlFor="lastName">Last name</label>
            { errors.lastName ? (<p className="error-display"> { errors.lastName } </p>) : '' }
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
            { authenticating ? <i class="fa fa-spinner fa-spin"></i> : ''}
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
