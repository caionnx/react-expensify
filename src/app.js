import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

let hasRenderedApp = false;
const renderApp = () => {
  return !hasRenderedApp && (ReactDOM.render(jsx, document.getElementById('app')), hasRenderedApp = true);
}

firebase.auth().onAuthStateChanged(user => {
  const loginAuth = () => {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  };

  const logoutAuth = () => {
    store.dispatch(logout());
    renderApp();
    history.push('/')
  }

  return user ? loginAuth() : logoutAuth();
});