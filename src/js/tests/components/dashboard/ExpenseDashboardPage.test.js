import React from 'react'
import { shallow } from 'enzyme'
import ExpenseDashboardPage from '../../../components/dashboard/ExpenseDashboardPage'

test('should render ExpenseDashboardPage correctly', () => {
  const wrapper = shallow(<ExpenseDashboardPage />)
  expect(wrapper).toMatchSnapshot()
})
