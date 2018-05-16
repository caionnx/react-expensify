import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ExpenseListItem from './ExpenseListItem'
import selectExpenses from '../selectors/expenses'

export const ExpenseList = (props) => (
  <div className='content-container'>
    <div className='list-header'>
      <div className='show-for-mobile'>Expenses</div>
      <div className='show-for-desktop'>Expense</div>
      <div className='show-for-desktop'>Amount</div>
    </div>
    <div className='list-body'>
      {
        props.expenses.filtered.length === 0 ? (
          <div className='list-item list-item--message'>
            <span>No expenses</span>
          </div>
        ) : (
          props.expenses.filtered.map((expense) => {
            return <ExpenseListItem key={expense.id} {...expense} />
          })
        )
      }
    </div>
  </div>
)

ExpenseList.propTypes = {
  expenses: PropTypes.shape({
    filtered: PropTypes.array.isRequired
  })
}

const mapStateToProps = (state) => ({
  expenses: selectExpenses(state.expenses, state.filters)
})

export default connect(mapStateToProps)(ExpenseList)
