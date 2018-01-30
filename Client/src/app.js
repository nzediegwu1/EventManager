import React from 'react';
import reactDOM from 'react-dom';
import { App } from './components/routerComponent';
import { AppContainer } from 'react-hot-loader';
import '../src/resources/styles/bootstrap.min.css';
import '../src/resources/styles/custom.css';
import 'bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';


const render = () => {
  reactDOM.render(
    <AppContainer>
      <Router>
        <App />
      </Router>
    </AppContainer>,
    document.getElementById('root')
  );
};
render();