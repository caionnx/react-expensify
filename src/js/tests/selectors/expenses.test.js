import selectExpenses from '../../selectors/expenses'
import expenses from '../fixtures/expenses'

test('should filter by text value', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const result = selectExpenses(expenses, filters)
  expect(result.filtered).toEqual([expenses[2], expenses[1]])
  expect(result.unfiltered).toEqual([expenses[0]])
})

test('should filter by startDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: new Date(0),
    endDate: undefined
  }
  const result = selectExpenses(expenses, filters)
  expect(result.filtered).toEqual([expenses[2], expenses[0]])
  expect(result.unfiltered).toEqual([expenses[1]])
})

test('should filter by endDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: new Date(432000000)
  }
  const result = selectExpenses(expenses, filters)
  expect(result.filtered).toEqual([expenses[0], expenses[1]])
  expect(result.unfiltered).toEqual([expenses[2]])
})

test('should sort by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const result = selectExpenses(expenses, filters)
  expect(result.filtered).toEqual([expenses[2], expenses[0], expenses[1]])
  expect(result.unfiltered).toEqual([])
})

test('should sort by amount', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
  const result = selectExpenses(expenses, filters)
  expect(result.filtered).toEqual([expenses[1], expenses[2], expenses[0]])
  expect(result.unfiltered).toEqual([])
})
