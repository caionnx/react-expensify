import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers/filters'
import authReducer from '../reducers/auth'
import categoriesReducer from '../reducers/categories'

const includeReduxDevtools = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : undefined
const composeEnhancers = includeReduxDevtools || compose

export default () =>
  createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
      auth: authReducer,
      categories: categoriesReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  )
