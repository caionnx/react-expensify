import React from 'react'
import { connect } from 'react-redux'
import { startEmailLogin } from '../actions/auth'
import PropTypes from 'prop-types'

export class LoginEmailForm extends React.Component {
  state = {
    error: false,
    loading: false
  }

  onFormSubmit = (ev) => {
    ev.preventDefault()
    const formData = new FormData(ev.target) // eslint-disable-line
    const email = formData.get('email')
    const password = formData.get('password')

    this.setState(() => ({ loading: true }))

    this.props.startEmailLogin(email, password).catch((fail) => {
      const error = 'Invalid email and/or password.'
      this.setState(() => ({ error, loading: false }))
    })
  }

  render () {
    const { error, loading } = this.state
    const { goBackFunction } = this.props

    return (
      <div>
        <p>Login with your email.</p>
        <form className='form' onSubmit={this.onFormSubmit}>
          <input placeholder='Email' aria-label='Email' type='text' name='email' required className='text-input' />
          <input placeholder='Password' aria-label='Password' type='password' name='password' required className='text-input' />
          { error && <p>{error}</p> }
          <button type='submit' className='button' disabled={loading}>
            { loading ? 'Loading..' : 'Login' }
          </button>
          { goBackFunction &&
            <a href='#' className='button button--secondary' onClick={goBackFunction}>Cancel</a> }
        </form>
      </div>
    )
  }
}

LoginEmailForm.propTypes = {
  startEmailLogin: PropTypes.func,
  goBackFunction: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
  startEmailLogin: (emai, password) => dispatch(startEmailLogin(emai, password))
})

export default connect(undefined, mapDispatchToProps)(LoginEmailForm)
