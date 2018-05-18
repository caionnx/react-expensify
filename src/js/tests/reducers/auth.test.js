import authReducer from '../../reducers/auth'

test('should set default state', () => {
  const state = authReducer(undefined, { type: '@@INIT' })
  expect(state).toEqual({})
})

test('should set uid for login', () => {
  const uid = 'f4sa8947'
  const action = {
    type: 'LOGIN',
    uid
  }
  const state = authReducer({}, action)

  expect(state.uid).toEqual(uid)
})

test('should unset uid for logout', () => {
  const action = {
    type: 'LOGOUT'
  }
  const loginState = { uid: '4f9saQfd' }
  const state = authReducer(loginState, action)

  expect(state.uid).toBeUndefined()
})
