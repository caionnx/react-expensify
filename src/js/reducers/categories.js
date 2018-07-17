export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return [...state, action.category].sort((a, b) => a.id.localeCompare(b.id))
    case 'SET_CATEGORIES':
      return action.categories
    case 'REMOVE_CATEGORY':
      return state.filter(({ id }) => id !== action.id)
    default:
      return state
  }
}
