import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter, { history } from './routers/AppRouter';
import { firebase } from './firebase/firebase';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import configureStore from './store/configureStore';
import LoadingPage from './components/LoadingPage';
import './app-styles';

const appNode = document.getElementById('app');
ReactDOM.render(<LoadingPage />, appNode);

let hasRenderedApp = false;
const store = configureStore();
const renderAppRouter = () => {
  if (!hasRenderedApp) {
    ReactDOM.render(
      <Provider store={store}>
        <AppRouter />
      </Provider>, appNode);

    hasRenderedApp = true;
  }
}

firebase.auth().onAuthStateChanged(user => {
  const loginAuth = () => {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderAppRouter();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  };

  const logoutAuth = () => {
    store.dispatch(logout());
    renderAppRouter();
    history.push('/')
  }

  return user ? loginAuth() : logoutAuth();
});