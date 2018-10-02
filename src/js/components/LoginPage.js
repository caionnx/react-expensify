import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { startGoogleLogin } from '../actions/auth'
import CreateUserForm from './CreateUserForm'

export class LoginPage extends React.Component {
  state = {
    logInWithEmail: false,
    createUser: false
  }

  toggleStateParam (ev, param) {
    ev.preventDefault()
    this.setState((prevState) => {
      const state = {}
      state[param] = !prevState[param]

      return state
    })
  }

  render () {
    const { startGoogleLogin } = this.props
    const { logInWithEmail, createUser } = this.state

    return (
      <div className='box-layout'>
        <div className='box-layout__box'>
          <h1 className='box-layout__title'>Expensify</h1>

          { !logInWithEmail && !createUser &&
            <div>
              <p>It's time to get your expenses under control.</p>
              <button className='button' onClick={startGoogleLogin}>Login with Google</button>
              <button className='button' onClick={ev => this.toggleStateParam(ev, 'logInWithEmail')}>Login with Email</button>
              <a href='#' onClick={ev => this.toggleStateParam(ev, 'createUser')}>Create account</a>
            </div>
          }
          { logInWithEmail &&
            <div>
              <a href='#' onClick={ev => this.toggleStateParam(ev, 'logInWithEmail')}>Back</a>
              <p>LogIn with your email.</p>
              <form onSubmit=''>
                <input type='text' />
                <input type='text' />
              </form>
            </div>
          }
          { createUser &&
            <CreateUserForm
              goBackFunction={ev => this.toggleStateParam(ev, 'createUser')} />
          }
        </div>
      </div>
    )
  }
}

LoginPage.propTypes = {
  startGoogleLogin: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  startGoogleLogin: () => dispatch(startGoogleLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)
