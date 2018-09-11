import database from '../firebase/firebase'

// REMOVE_CATEGORY
export const removeCategory = (id) => ({
  type: 'REMOVE_CATEGORY',
  id
})

export const startRemoveCategory = ({ id } = {}) => (dispatch, getState) => {
  const uid = getState().auth.uid

  return database.ref(`users/${uid}/categories/${id}`).remove().then(() => {
    dispatch(removeCategory(id))
  })
}

// ADD_CATEGORY
export const addCategory = (category) => ({
  type: 'ADD_CATEGORY',
  category
})

export const startAddCategory = (category = {}) => (dispatch, getState) => {
  const uid = getState().auth.uid
  const { id, value } = category

  return database.ref(`users/${uid}/categories/${id}`).set(value).then(() => {
    dispatch(addCategory(category))
  })
}

// SET_CATEGORIES
export const setCategories = (categories) => ({
  type: 'SET_CATEGORIES',
  categories
})

export const transformSnapshotToArray = (snapshot = []) => {
  const arr = []
  snapshot.forEach(el => {
    arr.push({
      id: el.key,
      value: el.val()
    })
  })

  return arr
}

export const startSetCategories = () => (dispatch, getState) => {
  const uid = getState().auth.uid
  let categories

  return database.ref(`users/${uid}/categories`).once('value').then((snapshot) => {
    categories = transformSnapshotToArray(snapshot)

    return categories.length && dispatch(setCategories(categories))
  })
}

export const startRegisterCategories = (categories, uid) => {
  return database.ref(`users/${uid}/categories`).set({...categories})
}

export const startAddDefaultCategories = () => (dispatch, getState) => {
  const uid = getState().auth.uid
  let categories

  return new Promise((resolve) => {
    database.ref('categories').once('value').then((snapshot) => {
      categories = transformSnapshotToArray(snapshot)

      if (!categories.length) return false

      startRegisterCategories(snapshot.val(), uid).then(() => {
        dispatch(setCategories(categories))
        resolve(true)
      })
    })
  })
}
