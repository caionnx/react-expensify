import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import dateFormat from 'date-fns/format'
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
  onClearDates = () => {
    this.props.setStartDate('')
    this.props.setEndDate('')
  }
  onStartDateChange = (startDate) => {
    this.props.setStartDate(startDate)
  }
  onEndDateChange = (endDate) => {
    this.props.setEndDate(endDate)
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
          <div className='DayPickerContainer'>
            <DayPickerInput
              format='MM/DD/YYYY'
              value={startDate && dateFormat(startDate, 'MM/DD/YYYY')}
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
            />
            <DayPickerInput
              ref={el => (this.endDate = el)}
              format='MM/DD/YYYY'
              value={endDate && dateFormat(endDate, 'MM/DD/YYYY')}
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
            <button onClick={this.onClearDates} type='button' aria-label='Clear Dates' className=''>
              <svg className='icon' viewBox='0 0 12 12' width='12' height='12'>
                { /* eslint-disable-next-line  */}
                <path fillRule='evenodd' d='M11.53.47a.75.75 0 0 0-1.061 0l-4.47 4.47L1.529.47A.75.75 0 1 0 .468 1.531l4.47 4.47-4.47 4.47a.75.75 0 1 0 1.061 1.061l4.47-4.47 4.47 4.47a.75.75 0 1 0 1.061-1.061l-4.47-4.47 4.47-4.47a.75.75 0 0 0 0-1.061z'></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

ExpenseListFilters.propTypes = {
  filters: PropTypes.shape({
    endDate: PropTypes.oneOfType([ PropTypes.instanceOf(Date), PropTypes.string ]),
    sortBy: PropTypes.string,
    startDate: PropTypes.oneOfType([ PropTypes.instanceOf(Date), PropTypes.string ]),
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
