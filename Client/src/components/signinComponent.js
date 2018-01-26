import React from 'react';
import { FormGroup } from './formGroup';
import { SignupForm } from './signupComponent';
import usernameImage from '../resources/images/glyphicons-522-user-lock.png';
import passwordImage from '../resources/images/glyphicons-204-lock.png';

const inputAttrs = (inputType, inputName, placeholder, className, required) => {
  return { inputType, inputName, placeholder, className, required };
};
export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signinView: 'block',
      signupView: 'none',
    };
    this.changeState = this.changeState.bind(this);
  }
  changeState() {
    this.setState(prevState => ({
      signinView: (prevState.signinView === 'block') ? 'none' : 'block',
      signupView: (prevState.signupView === 'none') ? 'block' : 'none',      
    }));
  }
  render() {
    const content = (
      <div className="background-image">
        <div className="container">
          <div id="titleDiv">
            <b className="main-title">EventManager</b>
          </div>
          <div id="loginPanel" className="mx-sm-auto col-sm-6">
            <div style={{ display: this.state.signupView }}>
              <SignupForm changeState={this.changeState}/>
            </div>
            <form role="form" action="pages/MyEvents.html" className="formDiv" id="signinForm" style={{ display: this.state.signinView }}>
              <h3 className="text-center panel-font"><b>Login</b></h3>
              <br />
              <FormGroup image={usernameImage} alt='username' inputProps={inputAttrs('text', 'username', 'Username', 'form-control input-sm', 'required')} />
              <FormGroup image={passwordImage} alt='password' inputProps={inputAttrs('text', 'password', 'Password', 'form-control input-sm', 'required')} />
              <button type="submit" className="btn btn-lg btn-primary btn-block submitButton">Sign in</button>
              <div className="form-links">
                <a href="#" className="welcome" onClick={this.changeState}>Create account</a> | <a href="#" data-toggle="modal" data-target="#resetPassword">reset password</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
    return content;
  }
}