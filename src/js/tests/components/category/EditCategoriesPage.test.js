import React from 'react'
import { shallow } from 'enzyme'
import {
  EditCategoriesPage,
  default as ConnectedEditCategoriesPage
} from '../../../components/category/EditCategoriesPage'
import categories from '../../fixtures/categories'
import configureMockStore from 'redux-mock-store'
const mockStore = configureMockStore()

let wrapper, fillCategories, startAddDefaultCategories, startRemoveCategory

beforeEach(() => {
  fillCategories = jest.fn()
  startRemoveCategory = jest.fn(() => Promise.resolve(true))
  startAddDefaultCategories = jest.fn()
  wrapper = shallow(
    <EditCategoriesPage
      fillCategories={fillCategories}
      startRemoveCategory={startRemoveCategory}
      startAddDefaultCategories={startAddDefaultCategories}
      categories={categories} />
  )
})

test('should render EditCategoriesPage correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should open and close modal of remove category', () => {
  const category = wrapper.find('EditCategoryItem').at(0)
  category.props().buttonAction(categories[0].id)
  wrapper.find('Modal').props().onClose()

  expect(wrapper.state('removeCategoryModal')).toBe(false)
})

test('should open modal of remove category and then start removing it', (done) => {
  const category = wrapper.find('EditCategoryItem').at(0)
  category.props().buttonAction(categories[0].id)

  expect(wrapper.state('removeCategoryModal')).toBe(true)

  wrapper.find('Modal').props().onConfirm()

  setTimeout(() => {
    expect(startRemoveCategory).toHaveBeenCalledWith({ id: categories[0].id })
    expect(wrapper.state('removeCategoryModal')).toBe(false)
    done()
  }, 500)
})

test('should render AddStandardCategories if has not categories', () => {
  wrapper = shallow(
    <EditCategoriesPage
      fillCategories={fillCategories}
      startRemoveCategory={startRemoveCategory}
      startAddDefaultCategories={startAddDefaultCategories}
      categories={[]} />
  )
  const AddStandardCategoriesComponent = wrapper.find('AddStandardCategories')
  AddStandardCategoriesComponent.props().buttonAction() // Trigger component button action

  expect(AddStandardCategoriesComponent).toHaveLength(1)
  expect(startAddDefaultCategories).toHaveBeenCalled()
})

test('should have mapStateToProps and mapDispatchToProps', () => {
  const store = mockStore({ categories })
  wrapper = shallow(<ConnectedEditCategoriesPage store={store} />)

  expect(wrapper.prop('categories')).toEqual(categories)
  expect(wrapper.prop('fillCategories')).toBeInstanceOf(Function)
  expect(wrapper.prop('startRemoveCategory')).toBeInstanceOf(Function)
  expect(wrapper.prop('startAddDefaultCategories')).toBeInstanceOf(Function)
})
