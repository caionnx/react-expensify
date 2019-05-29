import React from 'react'
import PropTypes from 'prop-types'
import ErrorBoundary from '../components/common/ErrorBoundary'

const ReloadAppButton = () => (
  <button
    style={{marginTop: '1em'}}
    className='button button--expanded'
    onClick={() => window.location.reload() /* eslint-disable-line */}>
    Reload the app
  </button>
)

const ErrorBoundaryForRoute = (props) => (
  <ErrorBoundary
    errorMessage='Something went wrong loading this page. Please try to reload the app.'
    ErrorManagementComponent={ReloadAppButton}>
    {props.children}
  </ErrorBoundary>
)

ErrorBoundaryForRoute.propTypes = {
  children: PropTypes.any
}

export default ErrorBoundaryForRoute
