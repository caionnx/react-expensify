import React from 'react'
import { shallow } from 'enzyme'
import { LoginPage } from '../../components/LoginPage'

let startLoginProp
beforeAll(() => {
  startLoginProp = () => ({})
})

test('should render LoginPage correctly', () => {
  const wrapper = shallow(<LoginPage startGoogleLogin={startLoginProp} />)
  expect(wrapper).toMatchSnapshot()
})

test('should call startGoogleLogin on button click', () => {
  const startGoogleLogin = jest.fn()
  const wrapper = shallow(<LoginPage startGoogleLogin={startGoogleLogin} />)
  wrapper.find('button').at(0).simulate('click')

  expect(startGoogleLogin).toHaveBeenCalled()
})

test('should show LoginEmailForm on button click', () => {
  const wrapper = shallow(<LoginPage startGoogleLogin={startLoginProp} />)
  wrapper.find('button').at(1).simulate('click', { preventDefault: jest.fn() })
  const LoginEmailForm = wrapper.find('Connect(LoginEmailForm)')

  expect(LoginEmailForm).toHaveLength(1)
})

test('should show CreateUserForm on button click', () => {
  const wrapper = shallow(<LoginPage startGoogleLogin={startLoginProp} />)
  wrapper.find('a').simulate('click', { preventDefault: jest.fn() })
  const CreateUserForm = wrapper.find('Connect(CreateUserForm)')

  expect(CreateUserForm).toHaveLength(1)
})

test('should pass state modifier to CreateUserForm component', () => {
  const wrapper = shallow(<LoginPage startGoogleLogin={startLoginProp} />)
  const spy = jest.spyOn(wrapper.instance(), 'toggleStateParam')
  wrapper.setState({ logInWithEmail: true, createUser: true })
  wrapper.find('Connect(CreateUserForm)').prop('goBackFunction')({ preventDefault: jest.fn() })

  expect(spy).toHaveBeenCalled()
})

test('should pass state modifier to LoginEmailForm component', () => {
  const wrapper = shallow(<LoginPage startGoogleLogin={startLoginProp} />)
  const spy = jest.spyOn(wrapper.instance(), 'toggleStateParam')
  wrapper.setState({ logInWithEmail: true, createUser: true })
  wrapper.find('Connect(LoginEmailForm)').prop('goBackFunction')({ preventDefault: jest.fn() })

  expect(spy).toHaveBeenCalled()
})
