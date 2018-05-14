import React from 'react';
import { shallow } from 'enzyme';
import { filters } from '../fixtures/filters';
import expenses from '../fixtures/expenses';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('Should render Expenses Summary correctly with 0 expenses', () => {
    const expensesSelector = { filtered: [], unfiltered: [] };
    const wrapper = shallow(<ExpensesSummary expenses={expensesSelector} filters={filters} />)

    expect(wrapper).toMatchSnapshot();
});

test('Should render Expenses Summary correctly with multiple expenses', () => {
    const expensesSelector = { filtered: expenses, unfiltered: [] };
    const wrapper = shallow(<ExpensesSummary expenses={expensesSelector} filters={filters} />)

    expect(wrapper).toMatchSnapshot();
});