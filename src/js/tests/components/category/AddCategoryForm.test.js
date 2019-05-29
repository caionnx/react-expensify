import React from 'react'
import { shallow } from 'enzyme'
import { AddCategoryForm } from '../../../components/category/AddCategoryForm'
import categories from '../../fixtures/categories'

let wrapper, startAddCategory

beforeEach(() => {
  startAddCategory = jest.fn()
  wrapper = shallow(<AddCategoryForm startAddCategory={startAddCategory} categories={categories} />)
})

test('should render AddCategoryForm correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should not add empty category', () => {
  wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })

  expect(startAddCategory).not.toHaveBeenCalled()
  expect(wrapper.state('error')).toBeTruthy()
})

test('should not add existing category', () => {
  const textInput = wrapper.find('input')
  const submitBtn = wrapper.find('form')
  textInput.simulate('change', { target: { value: categories[0].value } })
  submitBtn.simulate('submit', { preventDefault: jest.fn() })

  expect(startAddCategory).not.toHaveBeenCalled()
  expect(wrapper.state('error')).toBeTruthy()
})

test('should start add new category', () => {
  const textInput = wrapper.find('input')
  const submitBtn = wrapper.find('form')
  textInput.simulate('change', { target: { value: 'Podcast' } })
  submitBtn.simulate('submit', { preventDefault: jest.fn() })

  expect(startAddCategory).toHaveBeenCalledWith({ id: 'podcast', value: 'Podcast' })
  expect(wrapper.state('error')).not.toBeTruthy()
})
