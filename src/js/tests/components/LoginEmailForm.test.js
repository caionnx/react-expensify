import React from 'react'
import { shallow } from 'enzyme'
import { LoginEmailForm } from '../../components/LoginEmailForm'

let wrapper, startEmailLogin, goBackFunction

beforeEach(() => {
  startEmailLogin = jest.fn(
    (email) => email === 'invalid' ? Promise.reject(new Error('Fail')) : Promise.resolve('Success')
  )
  goBackFunction = jest.fn()
  wrapper = shallow(
    <LoginEmailForm
      startEmailLogin={startEmailLogin}
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

test('should submit form with input values', () => {
  const email = 'xpto@gmail.com'
  const password = '1124512'
  wrapper.find('input').at(0).simulate('change', { target: { value: email } })
  wrapper.find('input').at(1).simulate('change', { target: { value: password } })
  wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })

  expect(startEmailLogin).toHaveBeenCalledWith(email, password)
})

test('should submit form and set error if fails', (done) => {
  wrapper.find('input').at(0).simulate('change', { target: { value: 'invalid' } })
  wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })

  setTimeout(() => {
    expect(wrapper.state('error')).toBeTruthy()
    done()
  }, 500)
})
