import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ExpenseForm from './ExpenseForm'
import { startEditExpense, startRemoveExpense } from '../actions/expenses'

export class EditExpensePage extends React.Component {
  state = {
    confirmRemoveModal: false
  }
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense).then(() => {
      this.props.history.push('/dashboard')
    })
  }
  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id }).then(() => {
      this.props.history.push('/dashboard')
    })
  }
  onOpenRemoveModal = () => {
    this.setState({ confirmRemoveModal: true })
  }
  onCloseRemoveModal = () => {
    this.setState({ confirmRemoveModal: false })
  }
  componentWillMount () {
    if (!this.props.expense) {
      this.props.history.push('/dashboard')
    }
  }
  render () {
    return (
      <div>
        <div className='page-header'>
          <div className='content-container'>
            <h1 className='page-header__title'>Edit Expense</h1>
          </div>
        </div>
        <div className='content-container'>
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <button
            id='openRemoveModal'
            className='button button--secondary'
            onClick={this.onOpenRemoveModal}>
            Remove Expense
          </button>

          <Modal
            isOpen={this.state.confirmRemoveModal}
            onRequestClose={this.onCloseRemoveModal}
            appElement={document.getElementById('app')}
            contentLabel='Remove Expense Modal'
            closeTimeoutMS={200}
            className='modal'>

            <p className='modal__body'>Are you sure you want to remove this expense?</p>
            <div className='modal__options'>
              <button className='button' onClick={this.onCloseRemoveModal}>Cancel</button>
              <button id='removeExpense' className='button button--secondary' onClick={this.onRemove}>Remove</button>
            </div>
          </Modal>
        </div>
      </div>
    )
  }
}

EditExpensePage.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.string
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  startEditExpense: PropTypes.func.isRequired,
  startRemoveExpense: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)
