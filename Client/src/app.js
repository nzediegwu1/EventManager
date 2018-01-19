import React from 'react';
import reactDOM from 'react-dom';
import RecoverPassword from './components/rePasswordComponent';
import SignIn from './components/signinComponent'
import { AppContainer } from 'react-hot-loader';
import './resources/styles/bootstrap.min.css';
import './resources/styles/custom.css';


const Content = (
  <div>
    <RecoverPassword />
    <SignIn />
  </div>
);
const render = () => {
  reactDOM.render(
    <AppContainer>
      <Content />
    </AppContainer>,
    document.getElementById('root')
  );
};
render();
/*
if (module.hot) {
  module.hot.accept('./helloComponent', () => {
    render(Hello);
  });
}
*/