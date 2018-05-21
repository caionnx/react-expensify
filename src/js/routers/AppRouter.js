import { Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import createHistory from 'history/createBrowserHistory'
import LoginPage from '../components/LoginPage'
import ExpenseDashboardPage from '../components/ExpenseDashboardPage'
import AddExpensePage from '../components/AddExpensePage'
import EditExpensePage from '../components/EditExpensePage'
import NotFoundPage from '../components/NotFoundPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export const history = createHistory()

export const SwitchRoutes = () => (
  <Switch>
    <PublicRoute path='/' component={LoginPage} exact />
    <PrivateRoute path='/dashboard' component={ExpenseDashboardPage} />
    <PrivateRoute path='/create' component={AddExpensePage} />
    <PrivateRoute path='/edit/:id' component={EditExpensePage} />
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
