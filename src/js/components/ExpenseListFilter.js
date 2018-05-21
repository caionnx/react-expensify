import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setTextFilter, sortByDate, sortByAmount } from '../actions/filters'

const onChangeSortBy = (dispatch, e) =>
  e.target.value === 'date'
    ? dispatch(sortByDate(e.target.value))
    : dispatch(sortByAmount(e.target.value))

export const ExpenseListFilter = (props) => (
  <div>
    <input
      type='text'
      value={props.filters.text}
      onChange={(e) => props.dispatch(setTextFilter(e.target.value))} />
    <select
      onChange={(e) => onChangeSortBy(props.dispatch, e)}
      value={props.filters.sortBy}>
      <option value='date'>Date</option>
      <option value='amount'>Amount</option>
    </select>
  </div>
)

ExpenseListFilter.propTypes = {
  dispatch: PropTypes.func,
  filters: PropTypes.shape({
    sortBy: PropTypes.string,
    text: PropTypes.string
  })
}

const mapStateToProps = (state) => ({
  filters: state.filters
})

export default connect(mapStateToProps)(ExpenseListFilter)
