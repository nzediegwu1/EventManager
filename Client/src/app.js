import React from 'react';
import reactDOM from 'react-dom';
import { Content } from './components/bodyComponent';
import { AppContainer } from 'react-hot-loader';
import '../src/resources/styles/bootstrap.min.css';
import '../src/resources/styles/custom.css';
import 'bootstrap';

const render = () => {
  reactDOM.render(
    <AppContainer>
      <Content />
    </AppContainer>,
    document.getElementById('root')
  );
};
render();