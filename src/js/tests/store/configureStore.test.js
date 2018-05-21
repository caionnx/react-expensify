import configureStore from '../../store/configureStore'

test('should create store', () => {
  const store = configureStore()

  expect(typeof store.dispatch).toBe('function')
  expect(typeof store.getState).toBe('function')
  expect(typeof store.subscribe).toBe('function')
})
