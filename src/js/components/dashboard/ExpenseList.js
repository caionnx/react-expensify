import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ExpenseListItem from './ExpenseListItem'
import selectExpenses from '../../selectors/expenses'

export class ExpenseList extends React.Component {
  state = {
    expenseOnFocus: null
  }

  toggleExpenseOnFocus = (id) => {
    if (window.getSelection().toString()) return
    this.setState((prevState) => {
      return {
        expenseOnFocus: prevState.expenseOnFocus !== id ? id : null
      }
    })
  }

  render () {
    const {
      expenses
    } = this.props

    const {
      expenseOnFocus
    } = this.state

    return (
      <div className='content-container'>
        <div className='list-header'>
          <div className='show-for-mobile'>Expenses</div>
          <div className='show-for-desktop'>Expense</div>
          <div className='show-for-desktop'>Amount</div>
        </div>
        <div className='list-body'>
          {
            expenses.filtered.length === 0 ? (
              <div className='list-item list-item--message'>
                <span>No expenses</span>
              </div>
            ) : (
              expenses.filtered.map((expense) =>
                <ExpenseListItem
                  key={expense.id}
                  handleFocus={this.toggleExpenseOnFocus}
                  isOnFocus={expense.id === expenseOnFocus}
                  {...expense} />
              )
            )
          }
        </div>
      </div>
    )
  }
}

ExpenseList.propTypes = {
  expenses: PropTypes.shape({
    filtered: PropTypes.array.isRequired
  })
}

const mapStateToProps = (state) => ({
  expenses: selectExpenses(state.expenses, state.filters)
})

export default connect(mapStateToProps)(ExpenseList)
