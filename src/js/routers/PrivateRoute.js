import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import Header, { Header as DisconnectedHeader } from '../components/Header'

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  connectedHeader = true,
  ...rest
}) => (
  <Route {...rest} component={(props) => {
    if (isAuthenticated) {
      return (
        <div>
          {connectedHeader ? <Header /> : <DisconnectedHeader />}
          <Component {...props} />
        </div>
      )
    }

    return <Redirect to='/' />
  }} />
)

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  component: PropTypes.func,
  connectedHeader: PropTypes.bool
}

const maptStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
})

export default connect(maptStateToProps)(PrivateRoute)
