import React from 'react'
import 'react-dates/initialize'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { Router, MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { filters } from '../fixtures/filters'
import AppRouter, { SwitchRoutes } from '../../routers/AppRouter'
import LoginPage from '../../components/LoginPage'
import NotFoundPage from '../../components/NotFoundPage'
import ExpenseDashboardPage from '../../components/ExpenseDashboardPage'
import AddExpensePage from '../../components/AddExpensePage'

let SimulateApp
const createMockStore = configureMockStore([thunk])
beforeAll(() => {
  const store = createMockStore({ auth: { uid: '54a657' }, filters, expenses: [] })

  SimulateApp = () => (
    <Provider store={store}>
      <SwitchRoutes />
    </Provider>
  )
})

test('should AppRouter contains a router', () => {
  const wrapper = mount(<AppRouter />)

  expect(wrapper.find(Router)).toHaveLength(1)
})

test('should render 404 to invalid path', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/anything' ]}>
      <SimulateApp />
    </MemoryRouter>
  )

  expect(wrapper.find(NotFoundPage)).toHaveLength(1)
})

test('should render LoginPage to unauthorized user', () => {
  const store = createMockStore({ auth: { }, filters, expenses: [] })
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <Provider store={store}>
        <SwitchRoutes />
      </Provider>
    </MemoryRouter>
  )

  expect(wrapper.find(LoginPage)).toHaveLength(1)
})

test('should render ExpenseDashboardPage to home path', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <SimulateApp />
    </MemoryRouter>
  )

  expect(wrapper.find(ExpenseDashboardPage)).toHaveLength(1)
})

test('should render AddExpensePage to create path', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/create' ]}>
      <SimulateApp />
    </MemoryRouter>
  )

  expect(wrapper.find(AddExpensePage)).toHaveLength(1)
})