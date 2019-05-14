import React from 'react'
import { shallow } from 'enzyme'
import ErrorBoundary from '../../components/ErrorBoundary'

let wrapper
const Component = () => null

test('should render the children component correctly', () => {
  wrapper = shallow(
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  )

  expect(wrapper.find(Component)).toHaveLength(1)
})

test('should render an error message if the child component produces an error', () => {
  wrapper = shallow(
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  )
  wrapper.find(Component).simulateError(new Error('Ops'))
  expect(wrapper).toMatchSnapshot()
})
