import { Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import loadable from '@loadable/component'
import createHistory from 'history/createBrowserHistory'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
const LoginPage = loadable(() => import('../components/LoginPage'))
const AddExpensePage = loadable(() => import('../components/AddExpensePage'))
const EditExpensePage = loadable(() => import('../components/EditExpensePage'))
const EditCategoriesPage = loadable(() => import('../components/EditCategoriesPage'))
const NotFoundPage = loadable(() => import('../components/NotFoundPage'))
const ExpenseDashboardPage = loadable(() => import('../components/ExpenseDashboardPage'))
export const history = createHistory()

export const SwitchRoutes = () => (
  <Switch>
    <PublicRoute path='/' component={LoginPage} exact />
    <PrivateRoute path='/dashboard' component={ExpenseDashboardPage} />
    <PrivateRoute path='/create' component={AddExpensePage} />
    <PrivateRoute path='/edit/:id' component={EditExpensePage} />
    <PrivateRoute path='/edit_categories/' component={EditCategoriesPage} />
    <Route component={NotFoundPage} />
  </Switch>
)

const AppRouter = () => (
  <Router history={history}>
    <div>
      <SwitchRoutes />
    </div>
  </Router>
)

export default AppRouter
