import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import { EditExpensePage } from '../../components/EditExpensePage';

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
  startEditExpense = jest.fn(() => Promise.resolve({}));
  startRemoveExpense = jest.fn(() => Promise.resolve({}));
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
      expense={expenses[2]}
    />
  );
});

test('should render EditExpensePage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
  
  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);

  return startEditExpense().then(() => {
    expect(history.push).toHaveBeenLastCalledWith('/');
  });
});

test('should handle startRemoveExpense', () => {
  wrapper.find('button').simulate('click');
  
  expect(startRemoveExpense).toHaveBeenLastCalledWith({
    id: expenses[2].id
  });
  
  return startRemoveExpense().then(() => {
    expect(history.push).toHaveBeenLastCalledWith('/');
  });
});
