import database from '../firebase/firebase'
import modeOperator from './loginModeOperator'

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
})

export const startAddExpense = (expenseData = {}) => (dispatch, getState) => {
  const auth = getState().auth
  const { uid } = auth
  const {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0,
    category = 'none'
  } = expenseData

  const expense = { description, note, amount, createdAt, category }

  return modeOperator(auth, {
    anonymous: () => dispatch(addExpense({
      id: String(Math.floor(Math.random() * 100)),
      ...expense
    })),
    connected: () => database.ref(`users/${uid}/expenses`).push(expense).then(ref => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }))
    })
  })
}

// REMOVE_EXPENSE
export const removeExpense = (id) => ({
  type: 'REMOVE_EXPENSE',
  id
})

export const startRemoveExpense = ({ id } = {}) => (dispatch, getState) => {
  const auth = getState().auth
  const { uid } = auth

  return modeOperator(auth, {
    anonymous: () => dispatch(removeExpense(id)),
    connected: () => database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
      dispatch(removeExpense(id))
    })
  })
}

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

export const startEditExpense = (id, updates) => (dispatch, getState) => {
  const auth = getState().auth
  const { uid } = auth

  return modeOperator(auth, {
    anonymous: () => dispatch(editExpense(id, updates)),
    connected: () => database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
      dispatch(editExpense(id, updates))
    })
  })
}

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
})

export const startSetExpenses = () => (dispatch, getState) => {
  const auth = getState().auth
  const { uid } = auth

  return modeOperator(auth, {
    anonymous: () => dispatch(setExpenses([])),
    connected: () => database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
      const expenses = []
      snapshot.forEach(element => {
        expenses.push({
          id: element.key,
          ...element.val()
        })
      })

      dispatch(setExpenses(expenses))
    })
  })
}
