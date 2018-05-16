import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ExpenseForm from './ExpenseForm'
import { startAddExpense } from '../actions/expenses'

export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startAddExpense(expense).then(() => {
      this.props.history.push('/')
    })
  }
  render () {
    return (
      <div>
        <div className='page-header'>
          <div className='content-container'>
            <h1 className='page-header__title'>Add Expense</h1>
          </div>
        </div>
        <div className='content-container'>
          <ExpenseForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    )
  }
}

AddExpensePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  startAddExpense: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense))
})

export default connect(undefined, mapDispatchToProps)(AddExpensePage)
