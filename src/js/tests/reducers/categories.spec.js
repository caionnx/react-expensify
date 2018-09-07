import categoriesReducer from '../../reducers/categories'
import categories from '../fixtures/categories'

const firstCategory = categories[0]

test('should set default state', () => {
  const state = categoriesReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual([])
})

test('should add category', () => {
  const action = {
    type: 'ADD_CATEGORY',
    category: firstCategory
  }
  const state = categoriesReducer([], action)

  expect(state).toEqual([firstCategory])
})

test('should add category alphabetically', () => {
  const category = {id: 'abc', value: 'ABC'}
  const action = {
    type: 'ADD_CATEGORY',
    category
  }
  const state = categoriesReducer(categories, action)

  expect(state[0]).toEqual(category)
})

test('should remove category', () => {
  const action = {
    type: 'REMOVE_CATEGORY',
    id: firstCategory.id
  }
  const state = categoriesReducer(categories, action)

  expect(state).not.toContainEqual(firstCategory)
})

test('should set categories', () => {
  const action = {
    type: 'SET_CATEGORIES',
    categories
  }
  const state = categoriesReducer([], action)

  expect(state).toEqual(categories)
})
