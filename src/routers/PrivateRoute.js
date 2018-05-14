import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import Header from '../components/Header';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => {
    if (isAuthenticated) {
      return (
        <div>
          <Header />
          <Component {...props} />
        </div>
      )
    }

    return <Redirect to="/" />
  }} />
);

const maptStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(maptStateToProps)(PrivateRoute);