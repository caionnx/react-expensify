import React from 'react'
import PropTypes from 'prop-types'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import ExpensesCategorySelect from './ExpensesCategorySelect'

export default class ExpenseForm extends React.Component {
  state = {
    description: this.props.expense ? this.props.expense.description : '',
    note: this.props.expense ? this.props.expense.note : '',
    amount: this.props.expense ? (this.props.expense.amount / 100).toString() : '',
    createdAt: this.props.expense ? new Date(this.props.expense.createdAt) : new Date(),
    category: this.setCategoryOnState(this.props.expense),
    calendarFocused: false,
    error: ''
  }
  setCategoryOnState (expense) {
    if (expense && expense.category) {
      return expense.category
    }

    return 'none'
  }
  onDescriptionChange = (e) => {
    const description = e.target.value
    this.setState(() => ({ description }))
  }
  onNoteChange = (e) => {
    const note = e.target.value
    this.setState(() => ({ note }))
  }
  onAmountChange = (e) => {
    const amount = e.target.value

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }))
    }
  }
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }))
    }
  }
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }))
  }
  onCategoryChange = (category) => {
    this.setState(() => ({ category }))
  }
  onSubmit = (e) => {
    e.preventDefault()

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({ error: 'Please provide description and amount.' }))
    } else {
      this.setState(() => ({ error: '' }))
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note,
        category: this.state.category
      })
    }
  }
  render () {
    return (
      <form className='form' onSubmit={this.onSubmit}>
        {this.state.error && <p className='form__error'>{this.state.error}</p>}
        <input
          className='text-input'
          type='text'
          placeholder='Description'
          autoFocus
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          className='text-input'
          type='text'
          placeholder='Amount'
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <ExpensesCategorySelect
          defaultValue={this.state.category || 'none'}
          onChange={this.onCategoryChange}
          defaultText='Select a Category' />
        <div className='DayPickerContainer DayPickerContainer--largeInput'>
          <DayPickerInput
            value={this.state.createdAt}
            onDayChange={this.onDateChange} />
        </div>
        <textarea
          className='textarea'
          placeholder='Add a note for your expense (optional)'
          value={this.state.note}
          onChange={this.onNoteChange}
        >{}</textarea>
        <div>
          <button className='button'>Save Expense</button>
        </div>
      </form>
    )
  }
}

ExpenseForm.propTypes = {
  expense: PropTypes.shape({
    amount: PropTypes.number,
    createdAt: PropTypes.number,
    description: PropTypes.string,
    note: PropTypes.string
  }),
  onSubmit: PropTypes.func.isRequired
}
