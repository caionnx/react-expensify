import loginModeOperator from '../../actions/loginModeOperator'

let auth, actions

beforeEach(() => {
  auth = { isAnonymous: true }
  actions = {
    anonymous: jest.fn(),
    connected: jest.fn()
  }
})

test('should run anonymous function if state is anonymous', () => {
  loginModeOperator(auth, actions)

  expect(actions.anonymous).toHaveBeenCalled()
})

test('should run connected function if state is not anonymous', () => {
  auth = { isAnonymous: false }
  loginModeOperator(auth, actions)

  expect(actions.connected).toHaveBeenCalled()
})
