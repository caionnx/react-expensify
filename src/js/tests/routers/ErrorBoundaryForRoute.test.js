import React from 'react'
import { shallow } from 'enzyme'
import ErrorBoundaryForRoute from '../../routers/ErrorBoundaryForRoute'

let wrapper, spyOnReload
const Component = () => null

beforeAll(() => {
  spyOnReload = jest.spyOn(window.location, 'reload')
})

afterAll(() => {
  jest.clearAllMocks()
})

test('should render the children properly with an error boundary', () => {
  wrapper = shallow(
    <ErrorBoundaryForRoute>
      <Component />
    </ErrorBoundaryForRoute>
  )
  expect(wrapper.find(Component)).toHaveLength(1)
  expect(wrapper.find('ErrorBoundary')).toHaveLength(1)
})

test('should perform a reload on page if contains an error', () => {
  let reloadButton
  wrapper = shallow(
    <ErrorBoundaryForRoute>
      <Component />
    </ErrorBoundaryForRoute>
  )

  wrapper = wrapper.find('ErrorBoundary').dive()
  wrapper.setState({ error: 'Ops' })
  reloadButton = wrapper.find('ReloadAppButton').dive()
  reloadButton.simulate('click')
  expect(spyOnReload).toHaveBeenCalled()
})
