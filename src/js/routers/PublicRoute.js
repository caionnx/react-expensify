import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => {
    if (!isAuthenticated) {
      return <Component {...props} />
    }

    return <Redirect to="/dashboard" />
  }} />
);

const maptStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(maptStateToProps)(PublicRoute);