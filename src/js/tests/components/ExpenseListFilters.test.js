import React from 'react'
import { shallow } from 'enzyme'
import { ExpenseListFilters, default as ConnectedExpenseListFilters } from '../../components/ExpenseListFilters'
import { filters, altFilters } from '../fixtures/filters'
import configureMockStore from 'redux-mock-store'
jest.mock('date-fns/format', () =>
  (date) => {
    if (date.match('1970-01-01')) return '01/01/1970'
    if (date.match('1970-01-04')) return '04/01/1970'
  }
)
const mockStore = configureMockStore()

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, setCategory, wrapper

beforeEach(() => {
  setTextFilter = jest.fn()
  sortByDate = jest.fn()
  sortByAmount = jest.fn()
  setStartDate = jest.fn()
  setEndDate = jest.fn()
  setCategory = jest.fn()
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      setCategory={setCategory}
    />
  )
})

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({
    filters: altFilters
  })
  expect(wrapper).toMatchSnapshot()
})

test('should handle text change', () => {
  const value = 'rent'
  wrapper.find('input').simulate('change', {
    target: { value }
  })
  expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

test('should sort by date', () => {
  const value = 'date'
  wrapper.setProps({
    filters: altFilters
  })
  wrapper.find('select').simulate('change', {
    target: { value }
  })
  expect(sortByDate).toHaveBeenCalled()
})

test('should sort by amount', () => {
  const value = 'amount'
  wrapper.find('select').simulate('change', {
    target: { value }
  })
  expect(sortByAmount).toHaveBeenCalled()
})

test('should call setCategory when component change', () => {
  wrapper.find('Connect(ExpensesCategorySelect)').prop('onChange')()
  expect(setCategory).toHaveBeenCalled()
})

test('should handle date changes', () => {
  const startDate = new Date()
  const endDate = new Date()
  wrapper.find('DayPickerInput').at(0).prop('onDayChange')({ startDate })
  wrapper.find('DayPickerInput').at(1).prop('onDayChange')({ endDate })
  expect(setStartDate).toHaveBeenLastCalledWith({ startDate })
  expect(setEndDate).toHaveBeenLastCalledWith({ endDate })
})

test('should clear dates on button click', () => {
  wrapper.find('button').simulate('click')
  expect(setStartDate).toHaveBeenLastCalledWith('')
  expect(setEndDate).toHaveBeenLastCalledWith('')
})

test('should have mapStateToProps and mapDispatchToProps', () => {
  const store = mockStore({ filters })

  wrapper = shallow(<ConnectedExpenseListFilters store={store} />)

  expect(wrapper.prop('filters')).toEqual(filters)
  expect(wrapper.prop('setTextFilter')()).toMatchObject({ type: expect.any(String) }) // Expect mapDispatch to generate an action object
  expect(wrapper.prop('sortByDate')()).toMatchObject({ type: expect.any(String) })
  expect(wrapper.prop('sortByAmount')()).toMatchObject({ type: expect.any(String) })
  expect(wrapper.prop('setStartDate')()).toMatchObject({ type: expect.any(String) })
  expect(wrapper.prop('setEndDate')()).toMatchObject({ type: expect.any(String) })
  expect(wrapper.prop('setCategory')()).toMatchObject({ type: expect.any(String) })
})
