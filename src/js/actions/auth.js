import {
  firebase,
  googleAuthProvider,
  createUser,
  logInUser,
  signInAnonymously
} from '../firebase/firebase'

export const login = (uid, isAnonymous) => ({
  type: 'LOGIN',
  uid,
  isAnonymous
})

export const startCreateUser = (email, password) => () => {
  return createUser(email, password)
}

export const startEmailLogin = (email, password) => () => {
  return logInUser(email, password)
}

export const startSignInAnonymously = () => {
  return signInAnonymously()
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
