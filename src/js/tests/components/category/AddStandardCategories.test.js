import React from 'react'
import { shallow } from 'enzyme'
import { AddStandardCategories } from '../../../components/category/AddStandardCategories'

let wrapper, buttonAction

beforeEach(() => {
  buttonAction = jest.fn()
  wrapper = shallow(<AddStandardCategories buttonAction={buttonAction} />)
})

test('should render AddStandardCategories correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should run buttonAction prop function', () => {
  const button = wrapper.find('button')
  button.simulate('click')

  expect(buttonAction).toHaveBeenCalled()
})
