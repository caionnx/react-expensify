import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { DateRangePicker } from 'react-dates'
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
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate)
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
    return (
      <div className='content-container'>
        <div className='input-group'>
          <div className='input-group__item'>
            <input
              className='text-input'
              placeholder='Search expenses'
              type='text'
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className='input-group__item'>
            <ExpensesCategorySelect
              onChange={this.onCategoryChange}
              defaultValue={this.props.filters.category || ''}
              defaultText='All categories' />
          </div>
          <div className='input-group__item'>
            <select
              className='select'
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value='date'>Date</option>
              <option value='amount'>Amount</option>
            </select>
          </div>
          <div className='input-group__item'>
            <DateRangePicker
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
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
