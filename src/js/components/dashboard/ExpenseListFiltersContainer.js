import React from 'react'
import ReactDOM from 'react-dom'
import isMobile from 'ismobilejs'
import { Sticky } from 'react-sticky'
import PropTypes from 'prop-types'
import ExpenseListFilters from './ExpenseListFilters'

export const MobileContainer = ({ isFilterOpen, buttonToHideHandler, buttonToShowHandler }) => (
  isFilterOpen
    ? <React.Fragment>
      <ExpenseListFilters />
      <button onClick={buttonToHideHandler} className='button button--expanded'>Hide Filters</button>
    </React.Fragment>
    : <Sticky>
      {({style, isSticky}) => (
        <button
          style={style}
          className='button button--expanded'
          onClick={() => buttonToShowHandler(isSticky)}>
          Show Filters
        </button>
      )}
    </Sticky>
)

class ExpensesListFiltersContainer extends React.Component {
  state = {
    isMobile: true,
    isFilterOpen: false,
    scrollPosition: 0
  }

  componentDidMount () {
    if (!isMobile.phone) this.setState({ isMobile: false })
    this.setState({ scrollPosition: ReactDOM.findDOMNode(this).getBoundingClientRect().top })
  }

  scrollToFilters = () => {
    window.scrollTo({
      top: this.state.scrollPosition - 10,
      left: 0,
      behavior: 'smooth'
    })
  }

  toggleFilters = () => {
    this.setState({ isFilterOpen: !this.state.isFilterOpen })
  }

  render () {
    const {
      isMobile,
      isFilterOpen
    } = this.state

    return (
      <div className='content-container'>
        <div className='input-group'>
          {
            isMobile
              ? <MobileContainer
                buttonToHideHandler={this.toggleFilters}
                isFilterOpen={isFilterOpen}
                buttonToShowHandler={
                  (isSticky) => { this.toggleFilters(); isSticky && this.scrollToFilters() }
                } />
              : <ExpenseListFilters />
          }
        </div>
      </div>
    )
  }
}

MobileContainer.propTypes = {
  isFilterOpen: PropTypes.bool.isRequired,
  buttonToHideHandler: PropTypes.func.isRequired,
  buttonToShowHandler: PropTypes.func.isRequired
}

export default ExpensesListFiltersContainer
