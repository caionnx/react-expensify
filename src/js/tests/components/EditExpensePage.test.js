import React from 'react'
import { shallow } from 'enzyme'
import expenses from '../fixtures/expenses'
import { EditExpensePage, default as ConnectedEditExpensePage } from '../../components/EditExpensePage'
import configureMockStore from 'redux-mock-store'
const mockStore = configureMockStore()

let startEditExpense, startRemoveExpense, history, wrapper

beforeEach(() => {
  startEditExpense = jest.fn(() => Promise.resolve({}))
  startRemoveExpense = jest.fn(() => Promise.resolve({}))
  history = { push: jest.fn() }
  wrapper = shallow(
    <EditExpensePage
      startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
      expense={expenses[2]}
    />
  )
})

test('should render EditExpensePage', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should redirect to dashboard if not has expense', () => {
  shallow( // 'mount' from Enzyme causes error
    <EditExpensePage
      startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
      expense={{}}
    />
  )

  expect(history.push).toHaveBeenLastCalledWith('/dashboard')
})

test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2])

  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2])

  return startEditExpense().then(() => {
    expect(history.push).toHaveBeenLastCalledWith('/dashboard')
  })
})

test('should open "remove confimation" modal', () => {
  wrapper.find('button#openRemoveExpenseModal').simulate('click')
  const modal = wrapper.find('Modal')
  expect(modal.prop('isOpen')).toBeTruthy()
})

test('should close "remove confimation" modal', () => {
  wrapper.find('button#openRemoveExpenseModal').simulate('click')
  wrapper.find('button#closeRemoveExpenseModal').simulate('click')
  const modal = wrapper.find('Modal')
  expect(modal.prop('isOpen')).toBeFalsy()
})

test('should handle startRemoveExpense', () => {
  wrapper.find('button#removeExpense').simulate('click') // Button inside modal

  expect(startRemoveExpense).toHaveBeenLastCalledWith({
    id: expenses[2].id
  })

  return startRemoveExpense().then(() => {
    expect(history.push).toHaveBeenLastCalledWith('/dashboard')
  })
})

test('should have mapStateToProps and mapDispatchToProps', () => {
  const store = mockStore({ expenses })
  wrapper = shallow(<ConnectedEditExpensePage store={store} match={{params: {id: expenses[0].id}}} />)

  expect(wrapper.prop('expense')).toEqual(expenses[0])
  expect(wrapper.prop('startEditExpense')).toBeInstanceOf(Function)
  expect(wrapper.prop('startRemoveExpense')).toBeInstanceOf(Function)
})
