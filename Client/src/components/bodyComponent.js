import React from 'react';
import { RecoverPassword } from './rePasswordComponent';
import { SignIn } from './signinComponent'

export const Content = (props) => {
    return (
      <div>
        <SignIn />
        <RecoverPassword />
      </div>
    );
  }
  