import React from 'react'
import { shallow } from 'enzyme'
import ErrorBoundary from '../../../components/common/ErrorBoundary'

let wrapper
const errorMessage = 'Something wrong.'
const Component = () => null
const HandleErrorComponent = () => null

test('should render the children component correctly', () => {
  wrapper = shallow(
    <ErrorBoundary errorMessage={errorMessage}>
      <Component />
    </ErrorBoundary>
  )

  expect(wrapper.find(Component)).toHaveLength(1)
})

test('should render an error message if the child component produces an error', () => {
  wrapper = shallow(
    <ErrorBoundary errorMessage={errorMessage}>
      <Component />
    </ErrorBoundary>
  )
  wrapper.find(Component).simulateError(new Error('Ops'))
  expect(wrapper).toMatchSnapshot()
})

test('should render an component from props to handle the error', () => {
  wrapper = shallow(
    <ErrorBoundary
      errorMessage={errorMessage}
      ErrorManagementComponent={HandleErrorComponent}>
      <Component />
    </ErrorBoundary>
  )
  wrapper.find(Component).simulateError(new Error('Ops'))
  expect(wrapper.find(HandleErrorComponent)).toHaveLength(1)
})
