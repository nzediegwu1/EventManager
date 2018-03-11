import React from 'react';
import reactDOM from 'react-dom';
import { App } from './components/routerComponent';
import { AppContainer } from 'react-hot-loader';
import '../src/resources/styles/bootstrap.min.css';
import '../src/resources/styles/custom.css';
import 'bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

const apiLink =
  process.env.NODE_ENV === 'production'
    ? 'https://eventmanager29.herokuapp.com'
    : 'http://localhost:8080';

localStorage.setItem('apiLink', apiLink);

const render = () => {
  reactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};
render();
