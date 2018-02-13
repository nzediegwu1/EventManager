import React from 'react';
import { SignIn } from './signinComponent';
import { Dashboard } from './dashboardComponent';
import { Route, Switch } from 'react-router-dom';


export const App = () => (
  <Switch >
    <Route exact path='/' component={SignIn} />
    <Route path='/dashboard' component={Dashboard} />
  </Switch>
);
