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

    this.setState(() => ({ amount, amountMath: amount, error: '' }))
  }
  onAmountFocus = () => {
    const { amountMath, amount } = this.state
    // Show Tip
    if (amountMath && (amountMath !== amount)) {
      this.setState(() => ({ amount: amountMath }))
    }
  }
  onAmountBlur = async () => {
    const amount = this.state.amount

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
        <div style={{position: 'relative'}}>
          <input
            className='text-input'
            type='text'
            placeholder='Amount'
            value={this.state.amount}
            onChange={this.onAmountChange}
            onFocus={this.onAmountFocus}
            onBlur={this.onAmountBlur}
          />
          <button
            type='button'
            className='tooltip tooltip--in-form'
            aria-label='Amount should be a number with maximum of two decimal points. You can also make custom mathematical operations (for example: 2 + 5 / 2).'
            data-balloon-length='medium'
            data-balloon-pos='left'>
            <svg className='tooltip__icon' xmlns='http://www.w3.org/2000/svg' width='25px' viewBox='0 0 23.625 23.625'>
              <path d='M11.812 0C5.289 0 0 5.289 0 11.812s5.289 11.813 11.812 11.813 11.813-5.29 11.813-11.813S18.335 0 11.812 0zm2.459 18.307c-.608.24-1.092.422-1.455.548a3.838 3.838 0 0 1-1.262.189c-.736 0-1.309-.18-1.717-.539s-.611-.814-.611-1.367c0-.215.015-.435.045-.659a8.23 8.23 0 0 1 .147-.759l.761-2.688c.067-.258.125-.503.171-.731.046-.23.068-.441.068-.633 0-.342-.071-.582-.212-.717-.143-.135-.412-.201-.813-.201-.196 0-.398.029-.605.09-.205.063-.383.12-.529.176l.201-.828c.498-.203.975-.377 1.43-.521a4.225 4.225 0 0 1 1.29-.218c.731 0 1.295.178 1.692.53.395.353.594.812.594 1.376 0 .117-.014.323-.041.617a4.129 4.129 0 0 1-.152.811l-.757 2.68a7.582 7.582 0 0 0-.167.736 3.892 3.892 0 0 0-.073.626c0 .356.079.599.239.728.158.129.435.194.827.194.185 0 .392-.033.626-.097.232-.064.4-.121.506-.17l-.203.827zm-.134-10.878a1.807 1.807 0 0 1-1.275.492c-.496 0-.924-.164-1.28-.492a1.57 1.57 0 0 1-.533-1.193c0-.465.18-.865.533-1.196a1.812 1.812 0 0 1 1.28-.497c.497 0 .923.165 1.275.497.353.331.53.731.53 1.196 0 .467-.177.865-.53 1.193z' />
            </svg>
          </button>
        </div>
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
