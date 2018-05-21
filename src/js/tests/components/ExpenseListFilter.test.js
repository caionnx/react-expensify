import React from 'react'
import { shallow } from 'enzyme'
import { ExpenseListFilter } from '../../components/ExpenseListFilter'
import { filters } from '../fixtures/filters'
import { setTextFilter, sortByDate, sortByAmount } from '../../actions/filters'

let wrapper, dispatch

beforeAll(() => {
  dispatch = jest.fn()
  wrapper = shallow(
    <ExpenseListFilter
      dispatch={dispatch}
      filters={filters}
    />
  )
})

test('should render ExpenseListFilter correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should dispatch text filter action', () => {
  const valueOfEvent = 'test'
  const action = setTextFilter(valueOfEvent)
  wrapper.find('input').simulate('change', {target: { value: valueOfEvent }})

  expect(dispatch).toHaveBeenLastCalledWith(action)
})

test('should dispatch sort by date action', () => {
  const valueOfEvent = 'date'
  const action = sortByDate(valueOfEvent)
  wrapper.find('select').simulate('change', {target: { value: valueOfEvent }})

  expect(dispatch).toHaveBeenLastCalledWith(action)
})

test('should dispatch sort by amount action', () => {
  const valueOfEvent = 'amount'
  const action = sortByAmount(valueOfEvent)
  wrapper.find('select').simulate('change', {target: { value: valueOfEvent }})

  expect(dispatch).toHaveBeenLastCalledWith(action)
})
