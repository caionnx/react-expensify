import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { startLogout } from '../actions/auth'

export class Header extends React.Component {
  state = {
    isMenuOpen: false
  }

  onMenuClick = () => {
    this.setState((prevState) => ({ isMenuOpen: !prevState.isMenuOpen }))
  }

  render () {
    const { startLogout } = this.props
    const { isMenuOpen } = this.state

    return (
      <header className='header'>
        <nav className='content-container'>
          <div className='header__content'>
            <Link className='header__title' to='/dashboard'>
              <h1>Expensify</h1>
            </Link>
            <button id='toggle-header-menu' aria-label='Open menu' className={`header__menu-toggle ${isMenuOpen ? 'is-active' : ''}`} onClick={this.onMenuClick}>
              <span />
            </button>
            <ul className={`header__menu ${isMenuOpen ? 'is-open' : ''}`}>
              <li>
                <Link className='button button--link' to='/edit_categories'>Categories</Link>
              </li>
              {
                startLogout &&
                <li>
                  <a href='#' className='button button--link' onClick={startLogout}>Logout</a>
                </li>
              }
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}

Header.propTypes = {
  startLogout: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header)
