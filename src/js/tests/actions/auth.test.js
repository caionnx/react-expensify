import { login, logout, startLogin, startLogout } from '../../actions/auth'

test('should setup login action object', () => {
  const uid = '849851dsaftrh'
  const action = login(uid)

  expect(action).toEqual({
    type: 'LOGIN',
    uid
  })
})

test('should setup logout action object', () => {
  const action = logout()

  expect(action).toEqual({
    type: 'LOGOUT'
  })
})

test('should start login proccess', () => {
  const action = startLogin()

  expect(typeof action().then).toBe('function')
})

test('should start logout proccess', () => {
  const action = startLogout()

  expect(typeof action().then).toBe('function')
})
