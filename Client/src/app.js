import React from 'react';
import reactDOM from 'react-dom';
import { App } from './components/routerComponent';
import { AppContainer } from 'react-hot-loader';
import '../src/resources/styles/bootstrap.min.css';
import '../src/resources/styles/custom.css';
import 'bootstrap';
import { Router } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import store from './store';
import { Provider } from 'react-redux';

const apiLink =
process.env.NODE_ENV !== 'production'
  ? 'http://localhost:8080'
  : 'https://eventmanager29.herokuapp.com';

localStorage.setItem('apiLink', apiLink);

const history = createHistory();
const render = () => {
  reactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history} >
          <App />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};
render();
