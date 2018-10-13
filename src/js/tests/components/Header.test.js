import React from 'react'
import { shallow } from 'enzyme'
import { Header } from '../../components/Header'

test('should render Header correctly', () => {
  const wrapper = shallow(<Header startLogout={() => null} />)
  expect(wrapper).toMatchSnapshot()
})

test('should render Header on demo mode correctly', () => {
  const wrapper = shallow(<Header startLogout={() => null} isAnonymous />)
  expect(wrapper).toMatchSnapshot()
})

test('should call startLogout on link click', () => {
  const startLogout = jest.fn()
  const wrapper = shallow(<Header startLogout={startLogout} />)
  wrapper.find('a').simulate('click')

  expect(startLogout).toHaveBeenCalled()
})

test('should change state and render correctly on toggle menu click', () => {
  const wrapper = shallow(<Header startLogout={() => null} />)
  wrapper.find('#toggle-header-menu').simulate('click')

  expect(wrapper.state('isMenuOpen')).toBeTruthy()
  expect(wrapper).toMatchSnapshot()
})
