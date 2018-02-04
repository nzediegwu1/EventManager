import React from 'react';
import reactDOM from 'react-dom';
import { App } from './components/routerComponent';
import { AppContainer } from 'react-hot-loader';
import '../src/resources/styles/bootstrap.min.css';
import '../src/resources/styles/custom.css';
import 'bootstrap';
import { Router } from 'react-router';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const render = () => {
  reactDOM.render(
    <AppContainer>
      <Router history={history} >
        <App />
      </Router>
    </AppContainer>,
    document.getElementById('root')
  );
};
render();