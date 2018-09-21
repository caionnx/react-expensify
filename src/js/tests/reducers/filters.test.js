import filtersReducer from '../../reducers/filters'

jest.mock('date-fns/start_of_month', () =>
  () => new Date(2018, 1, 1)
)

jest.mock('date-fns/end_of_month', () =>
  () => new Date(2018, 1, 31)
)

afterAll(() => {
  jest.clearAllMocks()
})

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: expect.any(Date),
    endDate: expect.any(Date),
    category: 'none'
  })
})

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' })
  expect(state.sortBy).toBe('amount')
})

test('should set sortBy to date', () => {
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount'
  }
  const action = { type: 'SORT_BY_DATE' }
  const state = filtersReducer(currentState, action)
  expect(state.sortBy).toBe('date')
})

test('should set text filter', () => {
  const text = 'This is my filter'
  const action = {
    type: 'SET_TEXT_FILTER',
    text
  }
  const state = filtersReducer(undefined, action)
  expect(state.text).toBe(text)
})

test('should set startDate filter', () => {
  const startDate = new Date()
  const action = {
    type: 'SET_START_DATE',
    startDate
  }
  const state = filtersReducer(undefined, action)
  expect(state.startDate).toEqual(startDate)
})

test('should set endDate filter', () => {
  const endDate = new Date()
  const action = {
    type: 'SET_END_DATE',
    endDate
  }
  const state = filtersReducer(undefined, action)
  expect(state.endDate).toEqual(endDate)
})

test('should set category filter', () => {
  const category = 'podcast'
  const action = {
    type: 'SET_CATEGORY',
    category
  }
  const state = filtersReducer(undefined, action)
  expect(state.category).toEqual(category)
})
