import React from 'react'
import PropTypes from 'prop-types'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import dateFormat from 'date-fns/format'
import stringMath from 'string-math'
import ExpensesCategorySelect from '../common/ExpensesCategorySelect'

const amountStringMath = (operation) => new Promise((resolve, reject) => {
  stringMath(operation, (err, result) => {
    if (err) reject(new Error(`Please provide amount in the valid format.`))

    if (result < 0) reject(new Error(`Negative amount is not valid. Please insert a new amount.`))
    else resolve(result)
  })
})

export default class ExpenseForm extends React.Component {
  state = {
    description: this.props.expense ? this.props.expense.description : '',
    note: this.props.expense ? this.props.expense.note : '',
    amount: this.props.expense ? (this.props.expense.amount / 100).toString() : '',
    amountMath: this.props.expense ? this.props.expense.amountMath : '',
    createdAt: this.props.expense ? new Date(this.props.expense.createdAt) : new Date(),
    category: this.setCategoryOnState(this.props.expense),
    calendarFocused: false,
    error: '',
    amountTip: false
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

    this.setState(() => ({ amount, amountMath: amount, error: '' }))
  }
  onAmountFocus = () => {
    const { amountMath, amount } = this.state
    // Show Tip
    if (amountMath && (amountMath !== amount)) {
      this.setState(() => ({ amount: amountMath }))
    }

    this.setState(() => ({ amountTip: true, error: '' }))
  }
  onAmountBlur = async () => {
    const amount = this.state.amount

    // Hide amount value description
    this.setState(() => ({ amountTip: false }))

    try {
      let result = await amountStringMath(amount)
      result = parseFloat(result, 10).toString()
      this.setState(() => ({ amount: result }))
    } catch (error) {
      this.setState(() => ({ amount: '', error: error.message }))
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
  onSubmit = async (e) => {
    e.preventDefault()
    const {
      description,
      amountMath = '',
      note,
      category
    } = this.state

    let error
    let { amount, createdAt } = this.state

    try {
      createdAt = createdAt.valueOf()
      amount = await amountStringMath(amount)
      if (!amount.toString().match(/^\d{1,}(\.\d{0,2})?$/)) throw new Error('Please provide amount in the valid format')
      amount = parseFloat(amount, 10) * 100
    } catch (error) {
      this.setState(() => ({ error: error.message }))

      return
    }

    if (!description) {
      error = 'Please provide description.'
      this.setState(() => ({ error }))

      return
    }

    this.setState(() => ({ error: '' }))
    this.props.onSubmit({
      description,
      amount,
      amountMath,
      createdAt,
      note,
      category
    })
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
          onFocus={this.onAmountFocus}
          onBlur={this.onAmountBlur}
        />
        { this.state.amountTip &&
          <p className='form__error'>
            Amount should be a number with maximum of two decimal points.
            You can also make custom mathematical operations (for example: 2 + 5 / 2).
          </p>
        }
        <ExpensesCategorySelect
          defaultValue={this.state.category || 'none'}
          onChange={this.onCategoryChange}
          defaultText='Select a Category' />
        <div className='DayPickerContainer DayPickerContainer--largeInput'>
          <DayPickerInput
            format='MM/DD/YYYY'
            inputProps={{readOnly: 'true'}}
            value={dateFormat(this.state.createdAt, 'MM/DD/YYYY')}
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
    amountMath: PropTypes.string,
    createdAt: PropTypes.number,
    description: PropTypes.string,
    note: PropTypes.string
  }),
  onSubmit: PropTypes.func.isRequired
}
