import React from 'react';
import { SignIn } from './signinComponent';
import { Dashboard } from './dashboardComponent';
import { Route, Switch } from 'react-router-dom';

export const App = () => (
  <Switch>
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/" component={SignIn} />
  </Switch>
);
