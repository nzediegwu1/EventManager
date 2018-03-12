import React from 'react';
import { SignIn } from './signinComponent';
import { Dashboard } from './dashboardComponent';
import { Route, Switch } from 'react-router-dom';

const apiLink = 'https://eventmanageronline.herokuapp.com';
localStorage.setItem('apiLink', apiLink);

export const App = () => (
  <Switch>
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/" component={SignIn} />
  </Switch>
);
