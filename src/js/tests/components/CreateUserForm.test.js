import React from 'react'
import { shallow } from 'enzyme'
import { CreateUserForm } from '../../components/CreateUserForm'

let wrapper, startCreateUser, goBackFunction, email, password

beforeEach(() => {
  email = 'xpto@gmail.com'
  password = 'passR11'
  startCreateUser = jest.fn(
    (email) => email === 'email@email.com' ? Promise.reject(new Error('Fail')) : Promise.resolve('Success')
  )
  goBackFunction = jest.fn()
  wrapper = shallow(
    <CreateUserForm
      startCreateUser={startCreateUser}
      goBackFunction={goBackFunction} />
  )
})

test('should render properly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should execute goBackFunction param on button click', () => {
  wrapper.find('button').at(1).simulate('click')

  expect(goBackFunction).toHaveBeenCalled()
})

test('should submit create user with correct values', () => {
  wrapper.find('input').at(0).simulate('change', { target: { value: email } })
  wrapper.find('input').at(1).simulate('change', { target: { value: email } })
  wrapper.find('input').at(2).simulate('change', { target: { value: password } })
  wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })

  expect(startCreateUser).toHaveBeenCalledWith(email, password)
})

test('should not submit create user if email its not valid', () => {
  email = 'invalid'
  wrapper.find('input').at(0).simulate('change', { target: { value: email } })
  wrapper.find('input').at(1).simulate('change', { target: { value: email } })
  wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })

  expect(startCreateUser).not.toHaveBeenCalled()
  expect(wrapper.state('error')).toBe('Invalid email address.')
})

test('should not submit create user if email its not confirmed', () => {
  wrapper.find('input').at(0).simulate('change', { target: { value: email } })
  wrapper.find('input').at(1).simulate('change', { target: { value: '' } })
  wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })

  expect(startCreateUser).not.toHaveBeenCalled()
  expect(wrapper.state('error')).toBe('Please, confirm your email.')
})

test('should not submit create user if password its not valid', () => {
  password = 'invalid'
  wrapper.find('input').at(0).simulate('change', { target: { value: email } })
  wrapper.find('input').at(1).simulate('change', { target: { value: email } })
  wrapper.find('input').at(2).simulate('change', { target: { value: password } })
  wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })

  expect(startCreateUser).not.toHaveBeenCalled()
  expect(wrapper.state('error')).toMatch('Password must be')
})

test('should fail create user and set error state', (done) => {
  email = 'email@email.com'
  wrapper.find('input').at(0).simulate('change', { target: { value: email } })
  wrapper.find('input').at(1).simulate('change', { target: { value: email } })
  wrapper.find('input').at(2).simulate('change', { target: { value: password } })
  wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })

  setTimeout(() => {
    expect(wrapper.state('error')).toBeTruthy()
    done()
  }, 500)
})
