import React from 'react';
import { SignIn } from './signinComponent';
import { Dashboard } from './dashboardComponent';
import { Route } from 'react-router-dom';


export const App = () => (
  <div >
    <Route exact path='/' component={SignIn} />
    <Route path='/dashboard' component={Dashboard} />
  </div>
);
