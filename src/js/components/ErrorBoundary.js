import React from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends React.Component {
  state = { error: null }

  componentDidCatch (error) {
    this.setState({ error })
  }

  render () {
    const { error } = this.state

    if (!error) {
      return this.props.children
    }

    return (
      <div className='content-container'>
        <h2>Something went wrong loading this page. Please try to reload the app.</h2>
        <details>
          <summary>Details for nerds</summary>
          {error.toString && error.toString()}
        </details>
      </div>
    )
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any
}

export default ErrorBoundary
