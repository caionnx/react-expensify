import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { startGoogleLogin } from '../actions/auth'

export const LoginPage = ({ startGoogleLogin }) => (
  <div className='box-layout'>
    <div className='box-layout__box'>
      <h1 className='box-layout__title'>Expensify</h1>
      <p>It's time to get your expenses under control.</p>
      <button className='button' onClick={startGoogleLogin}>Login with Google</button>
    </div>
  </div>
)

LoginPage.propTypes = {
  startGoogleLogin: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  startGoogleLogin: () => dispatch(startGoogleLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)
