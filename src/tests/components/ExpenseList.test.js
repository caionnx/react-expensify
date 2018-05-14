import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import expenses from '../fixtures/expenses';

test('should render ExpenseList with expenses', () => {
  const expensesSelector = { filtered: expenses, unfiltered: [] };
  const wrapper = shallow(<ExpenseList expenses={expensesSelector} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseList with empty message', () => {
  const expensesSelector = { filtered: [], unfiltered: [] };
  const wrapper = shallow(<ExpenseList expenses={expensesSelector} />);
  expect(wrapper).toMatchSnapshot();
});
