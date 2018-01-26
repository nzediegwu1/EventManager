import React from 'react';
import { RecoverPassword } from './rePasswordComponent';
import { SignIn } from './signinComponent'
/*
$(document).ready(() => {
  $('.welcome').click(() => {
    $('#signinForm').toggleClass('visibility');
    $('#signupForm').toggleClass('visibility'); // signup form will have visibility class
  });
});
*/
export const Content = (props) => {
    return (
      <div>
        <SignIn />
        <RecoverPassword />
      </div>
    );
  }
  