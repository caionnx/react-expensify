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
  wrapper.find('button').simulate('click')

  expect(startGoogleLogin).toHaveBeenCalled()
})
