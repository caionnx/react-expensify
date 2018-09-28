import { firebase, googleAuthProvider } from '../firebase/firebase'

export const login = (uid) => ({
  type: 'LOGIN',
  uid
})

export const startGoogleLogin = () => () => {
  return firebase.auth().signInWithPopup(googleAuthProvider)
}

export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => () => {
  return firebase.auth().signOut()
}
