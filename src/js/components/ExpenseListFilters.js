import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import ExpensesCategorySelect from './ExpensesCategorySelect'
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate,
  setCategory
} from '../actions/filters'

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  }
  onStartDateChange = (startDate) => {
    this.props.setStartDate(startDate)
  }
  onEndDateChange = (endDate) => {
    this.props.setEndDate(endDate)
  }
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }))
  }
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value)
  }
  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate()
    } else if (e.target.value === 'amount') {
      this.props.sortByAmount()
    }
  }
  onCategoryChange = (category) => {
    this.props.setCategory(category)
  }
  render () {
    const {
      startDate,
      endDate,
      text,
      category,
      sortBy
    } = this.props.filters

    return (
      <div className='content-container'>
        <div className='input-group'>
          <div className='input-group__item'>
            <input
              className='text-input'
              placeholder='Search expenses'
              type='text'
              value={text}
              onChange={this.onTextChange}
            />
          </div>
          <div className='input-group__item'>
            <ExpensesCategorySelect
              onChange={this.onCategoryChange}
              defaultValue={category || ''}
              defaultText='All categories' />
          </div>
          <div className='input-group__item'>
            <select
              className='select'
              value={sortBy}
              onChange={this.onSortChange}
            >
              <option value='date'>Date</option>
              <option value='amount'>Amount</option>
            </select>
          </div>
          <div className='InputFromTo'>
            <DayPickerInput
              value={startDate}
              placeholder='Start Date'
              dayPickerProps={{
                selectedDays: [startDate, { from: startDate, to: endDate }],
                disabledDays: { after: endDate },
                toMonth: endDate,
                modifiers: { start: startDate, end: endDate },
                numberOfMonths: 1,
                onDayClick: () => this.endDate.getInput().focus()
              }}
              onDayChange={this.onStartDateChange}
            />{' '}
            —{' '}
            <span className='InputFromTo-to'>
              <DayPickerInput
                ref={el => (this.endDate = el)}
                value={endDate}
                placeholder='End Date'
                dayPickerProps={{
                  selectedDays: [startDate, { from: startDate, to: endDate }],
                  disabledDays: { before: startDate },
                  modifiers: { start: startDate, end: endDate },
                  month: startDate,
                  fromMonth: startDate,
                  numberOfMonths: 1
                }}
                onDayChange={this.onEndDateChange}
              />
            </span>
          </div>
        </div>
      </div>
    )
  }
}

ExpenseListFilters.propTypes = {
  filters: PropTypes.shape({
    endDate: PropTypes.object,
    sortBy: PropTypes.string,
    startDate: PropTypes.object,
    text: PropTypes.string,
    category: PropTypes.string
  }),
  setEndDate: PropTypes.func.isRequired,
  setStartDate: PropTypes.func.isRequired,
  setTextFilter: PropTypes.func.isRequired,
  sortByAmount: PropTypes.func.isRequired,
  sortByDate: PropTypes.func.isRequired,
  setCategory: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  filters: state.filters
})

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
  setCategory: (category) => dispatch(setCategory(category))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters)
