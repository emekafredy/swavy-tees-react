import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';


const PrivateRoute = ({ component: ComposedComponent, auth: { isAuthenticated } }) => (
  <Route
    render={ props => (
      isAuthenticated
        ? <ComposedComponent {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}
          />
    )}
  />
);

const mapStateToProps = ({ auth }) => ({
  auth
 });

export default connect(mapStateToProps)(PrivateRoute);
