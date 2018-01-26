import React from 'react';
import { RecoverPassword } from './rePasswordComponent';
import { SignIn } from './signinComponent';
import { Dashboard } from './dashboardComponent';

// JQUERY
$(document).ready(() => {
  $('.appBackground').toggleClass('visibility');
  function toggler() {
    $('#signinPage').toggleClass('visibility');
    $('.appBackground').toggleClass('visibility');
  }
  $('#login').click(() => {
    toggler();
  });
  $('.logout').click(() => {
    $('#myModalSidebar').modal('hide');    
    toggler();
  });
});

export const Content = (props) => {
  return (
    <div>
      <SignIn />
      <RecoverPassword />
      <Dashboard />
    </div>
  );
}
