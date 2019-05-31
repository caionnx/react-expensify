import React from 'react'
import { shallow } from 'enzyme'
import { EditCategoryItem } from '../../../components/category/EditCategoryItem'
import categories from '../../fixtures/categories'

let wrapper, buttonAction

beforeEach(() => {
  buttonAction = jest.fn()
  wrapper = shallow(<EditCategoryItem buttonAction={buttonAction} category={categories[0]} />)
})

test('should render EditCategoryItem correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should run buttonAction prop function', () => {
  const button = wrapper.find('button')
  button.simulate('click')

  expect(buttonAction).toHaveBeenCalled()
})
