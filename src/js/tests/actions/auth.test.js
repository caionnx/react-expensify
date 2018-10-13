import {
  login,
  logout,
  startGoogleLogin,
  startLogout,
  startCreateUser,
  startEmailLogin,
  startSignInAnonymously
} from '../../actions/auth'
const mockPromiseResolved = () => Promise.resolve('success')
jest.mock('firebase/database', () => jest.fn())
jest.mock('firebase/auth', () => jest.fn())
jest.mock('firebase/app', () => {
  const auth = () => ({
    signInWithPopup: mockPromiseResolved,
    signOut: mockPromiseResolved,
    createUserWithEmailAndPassword: mockPromiseResolved,
    signInWithEmailAndPassword: mockPromiseResolved,
    signInAnonymously: mockPromiseResolved
  })
  auth.GoogleAuthProvider = jest.fn()
  return {
    initializeApp: jest.fn(),
    database: jest.fn(),
    auth
  }
})

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
  const action = startGoogleLogin()

  expect(typeof action().then).toBe('function')
})

test('should start logout proccess', () => {
  const action = startLogout()

  expect(typeof action().then).toBe('function')
})

test('should start create user proccess', () => {
  const action = startCreateUser('user', 'password')

  expect(typeof action().then).toBe('function')
})

test('should start login with email proccess', () => {
  const action = startEmailLogin('user', 'password')

  expect(typeof action().then).toBe('function')
})

test('should start login anonymously proccess', () => {
  const action = startSignInAnonymously()

  expect(typeof action.then).toBe('function')
})
