import React from 'react'
import { shallow } from 'enzyme'
import { ExpensesCategorySelect } from '../../components/ExpensesCategorySelect'
import categories from '../fixtures/categories'

let wrapper, onChange, fillCategories

beforeEach(() => {
  onChange = jest.fn()
  fillCategories = jest.fn()
  wrapper = shallow(
    <ExpensesCategorySelect
      defaultValue='none'
      defaultText='All categories'
      categories={categories}
      onChange={onChange}
      fillCategories={fillCategories} />
  )
})

test('should render ExpensesCategorySelect correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should call onChange when change select option', () => {
  const category = categories[0].id
  wrapper.find('select').simulate('change', { target: { value: category } })

  expect(onChange).toHaveBeenCalledWith(category)
})

test('should call fillCategories when component did mount, if necessary', () => {
  wrapper = shallow(
    <ExpensesCategorySelect
      defaultValue='none'
      defaultText='All categories'
      categories={[]}
      onChange={onChange}
      fillCategories={fillCategories} />
  )

  expect(fillCategories).toHaveBeenCalled()
})
