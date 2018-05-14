import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-dates/initialize';
import AppRouter, { history } from './js/routers/AppRouter';
import { firebase } from './js/firebase/firebase';
import { startSetExpenses } from './js/actions/expenses';
import { login, logout } from './js/actions/auth';
import configureStore from './js/store/configureStore';
import LoadingPage from './js/components/LoadingPage';
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