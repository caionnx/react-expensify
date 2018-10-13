import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'
import categories from '../fixtures/categories'
import {
  addCategory,
  removeCategory,
  setCategories,
  startAddCategory,
  startSetCategories,
  startAddDefaultCategories,
  transformSnapshotToArray,
  startRemoveCategory
} from '../../actions/categories'

const uid = 'testUID'
const defaultAuthState = { auth: { uid } }
const createMockStore = configureMockStore([thunk])

beforeEach(() => {
  database.ref(`users/${uid}/categories`).remove()
  jest.clearAllMocks()
  jest.resetAllMocks()
  jest.resetModules()
})

test('should setup add category object', () => {
  const category = { id: 'coffe', value: 'Coffe' }
  const result = addCategory(category)
  expect(result).toEqual({
    type: 'ADD_CATEGORY',
    category
  })
})

test('should setup remove category object', () => {
  const id = 'coffe'
  const result = removeCategory(id)
  expect(result).toEqual({
    type: 'REMOVE_CATEGORY',
    id
  })
})

test('should setup set categories object', () => {
  const result = setCategories(categories)
  expect(result).toEqual({
    type: 'SET_CATEGORIES',
    categories
  })
})

test('should start add category and store', (done) => {
  const store = createMockStore(defaultAuthState)
  const category = categories[0]

  store.dispatch(startAddCategory(category)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_CATEGORY',
      category
    })

    return database.ref(`users/${uid}/categories/${actions[0].category.id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(category.value)
    done()
  })
})

test('should remove category from store and firebase', (done) => {
  const store = createMockStore(defaultAuthState)
  const category = categories[0]

  store.dispatch(startAddCategory(category)).then(() => // Should first add to database then start remove it
    Promise.resolve()
  ).then(() => {
    store.dispatch(startRemoveCategory(category)).then(() => {
      const actions = store.getActions()

      expect(actions[1]).toEqual({ // 0 -> ADD | 1 -> REMOVE
        type: 'REMOVE_CATEGORY',
        id: category.id
      })

      return database.ref(`users/${uid}/categories/${actions[0].category.id}`).once('value')
    }).then((snapshot) => {
      expect(snapshot.val()).toBeNull()

      done()
    })
  })
})

test('should fetch data from firebase', (done) => {
  const store = createMockStore(defaultAuthState)
  const category = categories[0]

  store.dispatch(startAddCategory(category)).then(() => // Should first add to database then start set
    Promise.resolve()
  ).then(() => {
    store.dispatch(startSetCategories()).then(() => {
      const actions = store.getActions()

      expect(actions[1]).toEqual({ // 0 -> ADD | 1 -> SET
        type: 'SET_CATEGORIES',
        categories: [category]
      })

      done()
    })
  })
})

test('should start set standard categories on firebase and store', (done) => {
  const store = createMockStore(defaultAuthState)
  const expectedDefault = [
    {id: 'education', value: 'Education'},
    {id: 'shopping', value: 'Shopping'}
  ]

  store.dispatch(startAddDefaultCategories()).then(() => {
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: 'SET_CATEGORIES',
      categories: expectedDefault
    })

    return database.ref(`users/${uid}/categories`).once('value')
  }).then((snapshot) => {
    expect(transformSnapshotToArray(snapshot)).toEqual(expectedDefault)
    done()
  })
})

describe('anonymous actions', () => {
  const anonymousAuthState = { auth: { uid, isAnonymous: true } }

  test('should set standard categories on local storage', (done) => {
    const store = createMockStore(anonymousAuthState)
    const expectedDefault = [
      {id: 'education', value: 'Education'},
      {id: 'shopping', value: 'Shopping'}
    ]

    store.dispatch(startAddDefaultCategories()).then(() => {
      const actions = store.getActions()

      expect(actions[0]).toEqual({
        type: 'SET_CATEGORIES',
        categories: expectedDefault
      })

      done()
    })
  })

  test('should start add category local', () => {
    const store = createMockStore(anonymousAuthState)
    const category = categories[0]

    return store.dispatch(startAddCategory(category)).then(() => {
      const actions = store.getActions()
      expect(actions[0]).toEqual({
        type: 'ADD_CATEGORY',
        category
      })
    })
  })

  test('should remove category from local store', (done) => {
    const store = createMockStore(anonymousAuthState)
    const category = categories[0]

    store.dispatch(startAddCategory(category)).then(() => // Should first add to database then start remove it
      Promise.resolve()
    ).then(() => {
      store.dispatch(startRemoveCategory(category)).then(() => {
        const actions = store.getActions()

        expect(actions[1]).toEqual({ // 0 -> ADD | 1 -> REMOVE
          type: 'REMOVE_CATEGORY',
          id: category.id
        })

        done()
      })
    })
  })

  test('should set empty list of categories on anonymous', () => {
    const store = createMockStore(anonymousAuthState)

    return store.dispatch(startSetCategories()).then(() => {
      const actions = store.getActions()

      expect(actions[0]).toEqual({
        type: 'SET_CATEGORIES',
        categories: []
      })
    })
  })
})
