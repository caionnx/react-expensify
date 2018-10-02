import { firebase, googleAuthProvider, createUser } from '../firebase/firebase'

export const login = (uid) => ({
  type: 'LOGIN',
  uid
})

export const startCreateUser = (email, password) => () => {
  return createUser(email, password)
}

export const startGoogleLogin = () => () => {
  return firebase.auth().signInWithPopup(googleAuthProvider)
}

export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => () => {
  return firebase.auth().signOut()
}
