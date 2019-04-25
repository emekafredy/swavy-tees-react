import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


export class PrivateRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  render() {
    console.log('PROPS', this.props);
    const { component: ProtectedComponent, auth: { isAuthenticated } } = this.props
    return (
      <Route
        render={props => (
          isAuthenticated
            ? <ProtectedComponent {...props} />
            : (
              <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
              }}
              />
            )
        )}
      />
    );
  }
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

export const mapStateToProps = ({ auth }) => ({
  auth
 });

export default connect(mapStateToProps, null, null, { pure: false })(PrivateRoute);
