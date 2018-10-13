import React from 'react'
import { shallow } from 'enzyme'
import { LoginPage } from '../../components/LoginPage'
import { startSignInAnonymously } from '../../actions/auth'
jest.mock('../../actions/auth')

let startGoogleLogin
let wrapper

beforeEach(() => {
  startGoogleLogin = jest.fn()
  wrapper = shallow(<LoginPage startGoogleLogin={startGoogleLogin} />)
})

test('should render LoginPage correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should call startGoogleLogin on button click', () => {
  wrapper.find('button').at(0).simulate('click')

  expect(startGoogleLogin).toHaveBeenCalled()
})

test('should show LoginEmailForm on button click', () => {
  wrapper.find('button').at(1).simulate('click', { preventDefault: jest.fn() })
  const LoginEmailForm = wrapper.find('Connect(LoginEmailForm)')

  expect(LoginEmailForm).toHaveLength(1)
})

test('should show CreateUserForm on button click', () => {
  wrapper.find('a').at(0).simulate('click', { preventDefault: jest.fn() })
  const CreateUserForm = wrapper.find('Connect(CreateUserForm)')

  expect(CreateUserForm).toHaveLength(1)
})

test('should perform startSignInAnonymously on button click', () => {
  wrapper.find('a').at(1).simulate('click', { preventDefault: jest.fn() })

  expect(startSignInAnonymously).toHaveBeenCalled()
})

test('should pass state modifier to CreateUserForm component', () => {
  const spy = jest.spyOn(wrapper.instance(), 'toggleStateParam')
  wrapper.setState({ logInWithEmail: true, createUser: true })
  wrapper.find('Connect(CreateUserForm)').prop('goBackFunction')({ preventDefault: jest.fn() })

  expect(spy).toHaveBeenCalled()
})

test('should pass state modifier to LoginEmailForm component', () => {
  const spy = jest.spyOn(wrapper.instance(), 'toggleStateParam')
  wrapper.setState({ logInWithEmail: true, createUser: true })
  wrapper.find('Connect(LoginEmailForm)').prop('goBackFunction')({ preventDefault: jest.fn() })

  expect(spy).toHaveBeenCalled()
})
