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

export const startRegisterCategories = (categories, uid) => {
  return database.ref(`users/${uid}/categories`).set({...categories})
}

// SET_CATEGORIES
export const setCategories = (categories) => ({
  type: 'SET_CATEGORIES',
  categories
})

export const startSetCategories = () => (dispatch, getState) => {
  const uid = getState().auth.uid
  const transformToArray = (object) => {
    const arr = []
    object.forEach(el => {
      arr.push({
        id: el.key,
        value: el.val()
      })
    })

    return arr
  }

  return database.ref(`users/${uid}/categories`).once('value').then((snapshot) => {
    let categories
    if (snapshot.hasChildren()) {
      categories = transformToArray(snapshot)
      dispatch(setCategories(categories))
    } else {
      database.ref(`categories`).once('value').then((defaultSnapshot) => {
        categories = transformToArray(defaultSnapshot)
        dispatch(setCategories(categories))

        return defaultSnapshot.hasChildren() &&
          startRegisterCategories(defaultSnapshot.val(), uid)
      })
    }
  })
}
