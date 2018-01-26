import React from 'react';
import { FormGroup } from './formGroup';
import usernameImage from '../resources/images/glyphicons-522-user-lock.png';
import fullNameImage from '../resources/images/glyphicons-4-user.png';
import emailImage from '../resources/images/glyphicons-11-envelope.png';
import phoneImage from '../resources/images/glyphicons-442-phone-alt.png';
import passwordImage from '../resources/images/glyphicons-204-lock.png';

const inputAttrs = (inputType, inputName, placeholder, className, required) => {
  return { inputType, inputName, placeholder, required, className };
};

export class SignupForm extends React.Component {
  render() {

    const content = (
      <form role="form" action="../index.html" className="formDiv" id="signupForm">
        <h3 className="text-center panel-font"><b>Register</b></h3>
        <br />
        <FormGroup image={usernameImage} alt='username' inputProps={inputAttrs('text', 'username', 'Username', 'form-control input-sm', 'required')} />
        <FormGroup image={fullNameImage} alt='fullname' inputProps={inputAttrs('text', 'fullname', 'Full name', 'form-control input-sm', 'required')} />
        <FormGroup image={emailImage} alt='email' inputProps={inputAttrs('text', 'email', 'Email', 'form-control input-sm', 'required')} />
        <FormGroup image={phoneImage} alt='phone' inputProps={inputAttrs('number', 'phone', 'Phone number', 'form-control input-sm')} />
        <FormGroup image={passwordImage} alt='password' inputProps={inputAttrs('password', 'password', 'Password', 'form-control input-sm', 'required')} />
        <FormGroup image={passwordImage} alt='password' inputProps={inputAttrs('password', 'rePassword', 'Re-enter Password', 'form-control input-sm', 'required')} />
        <button type="submit" className="btn btn-lg btn-primary btn-block submitButton">Signup</button>
        <div className="form-links">
          <a href="#" className="welcome" onClick = {this.props.changeState}>Already have an account? Signin</a>
        </div>
      </form>
    );
    return content;
  }
}