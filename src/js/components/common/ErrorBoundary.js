import React from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends React.Component {
  state = { error: null }

  componentDidCatch (error) {
    this.setState({ error })
  }

  render () {
    const { error } = this.state
    const {
      errorMessage,
      includeDetails = true,
      containerClassName = 'content-container',
      ErrorManagementComponent
    } = this.props

    if (!error) {
      return this.props.children
    }

    return (
      <div className={containerClassName}>
        <h2>{errorMessage}</h2>
        { includeDetails &&
          <details>
            <summary>Details for nerds</summary>
            {error.toString && error.toString()}
          </details>
        }
        { ErrorManagementComponent && <ErrorManagementComponent /> }
      </div>
    )
  }
}

ErrorBoundary.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  includeDetails: PropTypes.bool,
  containerClassName: PropTypes.string,
  children: PropTypes.any,
  ErrorManagementComponent: PropTypes.func
}

export default ErrorBoundary
