import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUserAction } from '../../redux/actions/authActions';

// styling
import '../../views/SignUp/signUp.scss';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
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
    const { loginUserAction } = this.props;
    const { email, password } = this.state;
    const existingUser = { email, password }
    loginUserAction(existingUser);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillUnmount() {
    this.setState({ });
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
        <h5 className="card-title text-center">Login</h5>
        <form className="form-signin" onSubmit={ this.handleSubmit }>
          <div className="form-label-group">
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              name="email"
              value={ this.state.email }
              onChange={ this.handleChange }
            />
            <label htmlFor="email">Email address</label>
            { errors.email ? (<p className="error-display"> { errors.email } </p>) : '' }
          </div>

          <div className="form-label-group">
            <input 
              type="password"
              id="password"
              className="form-control"
              placeholder="password"
              name="password"
              value={ this.state.password }
              onChange={ this.handleChange }
            />
            <label htmlFor="password">password</label>
            { errors.password ? (<p className="error-display"> { errors.password } </p>) : '' }
          </div>

          <button className="btn btn-lg btn-success btn-block text-uppercase" type="submit" disabled={authenticating}>
            { authenticating ? <i className="fa fa-spinner fa-spin"></i> : ''}
            Login
          </button>
          <p className="text-center"> <em>Don't have an account yet?</em> </p>
          <Link className="d-block text-center mt-2 small" to="/register">Sign Up</Link>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  loginUserAction: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const actionCreators = {
  loginUserAction
};

export const mapStateToProps = ({ auth }) => ({
 auth
});

export default connect( mapStateToProps, actionCreators)(Login);
