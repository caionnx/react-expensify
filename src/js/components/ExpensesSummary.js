import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import selectExpensesTotal from '../selectors/expenses-total'
import selectExpenses from '../selectors/expenses'

export const ExpensesSummary = ({ expenses }) => {
  const totalFromVisible = selectExpensesTotal(expenses.filtered)
  const filteredWord = expenses.filtered.length === 1 ? 'expense' : 'expenses'
  const unFilteredWord = expenses.unfiltered.length === 1 ? 'expense' : 'expenses'
  const totalFromVisibleFormatted = numeral(totalFromVisible / 100).format('$0,0.00')

  return (
    <div className='page-header'>
      <div className='content-container'>
        <h1 className='page-header__title'>Viewing <span>{expenses.filtered.length}</span> {filteredWord} totalling <span>{totalFromVisibleFormatted}</span></h1>
        <p><strong>{expenses.unfiltered.length}</strong> {unFilteredWord} hidden by filters.</p>
        <div className='page-header__actions'>
          <Link className='button' to='/create'>Add Expense</Link>
        </div>
      </div>
    </div>
  )
}

ExpensesSummary.propTypes = {
  expenses: PropTypes.object.isRequired
}

const mapStateToProps = ({ expenses, filters }) => ({
  expenses: selectExpenses(expenses, filters)
})

export default connect(mapStateToProps)(ExpensesSummary)
