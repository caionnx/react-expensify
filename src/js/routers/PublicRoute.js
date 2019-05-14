import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import ErrorBoundary from '../components/ErrorBoundary'

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => {
    if (!isAuthenticated) {
      return (
        <ErrorBoundary>
          <Component {...props} />
        </ErrorBoundary>
      )
    }

    return <Redirect to='/dashboard' />
  }} />
)

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ])
}

const maptStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
})

export default connect(maptStateToProps)(PublicRoute)
