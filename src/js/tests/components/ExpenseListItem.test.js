import React from 'react'
import { shallow } from 'enzyme'
import expenses from '../fixtures/expenses'
import ExpenseListItem from '../../components/ExpenseListItem'

jest.mock('date-fns/format', () =>
  () => 'January 1st, 1970'
)

test('should render ExpenseListItem correctly', () => {
  const wrapper = shallow(<ExpenseListItem handleFocus={jest.fn()} isOnFocus={false} {...expenses[0]} />)
  expect(wrapper).toMatchSnapshot()
})
