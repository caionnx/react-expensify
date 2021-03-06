import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import ErrorBoundaryForRoute from './ErrorBoundaryForRoute'
import Header, { Header as DisconnectedHeader } from '../components/common/Header'

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  connectedHeader = true,
  ...rest
}) => (
  <Route {...rest} component={(props) => {
    if (isAuthenticated) {
      return (
        <React.Fragment>
          {connectedHeader ? <Header /> : <DisconnectedHeader />}
          <ErrorBoundaryForRoute>
            <Component {...props} />
          </ErrorBoundaryForRoute>
        </React.Fragment>
      )
    }

    return <Redirect to='/' />
  }} />
)

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ]),
  connectedHeader: PropTypes.bool
}

const maptStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
})

export default connect(maptStateToProps)(PrivateRoute)
