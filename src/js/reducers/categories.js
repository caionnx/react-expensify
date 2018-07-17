export default (state = [], action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return action.categories
    case 'REMOVE_CATEGORY':
      return state.filter(({ id }) => id !== action.id)
    default:
      return state
  }
}
