import database from '../firebase/firebase'

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
      })
    }
  })
}
