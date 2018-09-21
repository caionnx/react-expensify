import {
  setStartDate,
  setEndDate,
  setTextFilter,
  sortByAmount,
  sortByDate,
  setCategory
} from '../../actions/filters'

test('should generate set start date action object', () => {
  const date = new Date()
  const action = setStartDate(date)
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: date
  })
})

test('should generate set end date action object', () => {
  const date = new Date()
  const action = setEndDate(date)
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: date
  })
})

test('should generate set text filter object with text value', () => {
  const text = 'Something in'
  const action = setTextFilter(text)
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text
  })
})

test('should generate set text filter object with default', () => {
  const action = setTextFilter()
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  })
})

test('should generate action object for sort by date', () => {
  expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' })
})

test('should generate action object for sort by amount', () => {
  expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT' })
})

test('should generate set category action object', () => {
  const category = { id: 'podcast', value: 'Podcast' }
  const action = setCategory(category)
  expect(action).toEqual({
    type: 'SET_CATEGORY',
    category
  })
})
