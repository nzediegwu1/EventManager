import React from 'react';
import { FormGroup } from './formGroup';
import { SignupForm } from './signupComponent';
import usernameIcon from '../resources/images/glyphicons-522-user-lock.png';
import passwordIcon from '../resources/images/glyphicons-204-lock.png';
import { RecoverPassword } from './rePasswordComponent';
import { Link } from 'react-router-dom';
import axios from 'axios';

const inputAttrs = (inputType, inputName, placeholder, className, ref, required) => {
  return { inputType, inputName, placeholder, className, ref, required };
};
export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signinView: 'block',
      signupView: 'none',
    };
    this.changeState = this.changeState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }
  changeState() {
    this.setState(prevState => ({
      signinView: (prevState.signinView === 'block') ? 'none' : 'block',
      signupView: (prevState.signupView === 'none') ? 'block' : 'none',
    }));
  }
  validate(username, password, event) {
    if (username.trim().length === 0) {
      alert('Username must not be empty');
    } else if (password.length < 6) {
      alert('password must be up to 6 characters');
    } else {
      return true;
    }
  }
  handleSubmit(event) {
    const username = this.username.value;
    const password = this.password.value;
    if (this.validate(this.username.value, this.password.value, event)) {
      axios.post('http://localhost:8000/api/v1/users/login', { username, password })
        .then(res => {
          localStorage.setItem('token', res.data.data.Token);
          this.props.history.push('/dashboard');
        }).catch(err => {
          if (err.response.status === 404) {
            alert(err.response.data.message);
          } else if (err.response.status === 401) {
            alert(err.response.data.message);
          }
        });
    }
    event.preventDefault();
  }
  render() {
    const content = (
      <div className="background-image" id="signinPage">
        <div className="container">
          <div id="titleDiv">
            <b className="main-title">EventManager</b>
          </div>
          <div id="loginPanel" className="mx-sm-auto col-sm-6">
            <div style={{ display: this.state.signupView }}>
              <SignupForm changeState={this.changeState} />
            </div>
            <form onSubmit={this.handleSubmit} role="form" className="formDiv" id="signinForm" style={{ display: this.state.signinView }}>
              <h3 className="text-center panel-font"><b>Login</b></h3>
              <br />
              <FormGroup image={usernameIcon} alt='username' inputProps={inputAttrs('text', 'username', 'Username', 'form-control input-sm', (input) => this.username = input, 'required')} />
              <FormGroup image={passwordIcon} alt='password' inputProps={inputAttrs('password', 'password', 'Password', 'form-control input-sm', (input) => this.password = input, 'required')} />
              <button type="submit" id='login' className="btn btn-lg btn-primary btn-block submitButton">Login</button>
              <div className="form-links">
                <a href="#" className="welcome" onClick={this.changeState}>Create account</a> | <a href="#" data-toggle="modal" data-target="#resetPassword">reset password</a>
              </div>
            </form>
          </div>
        </div>
        <RecoverPassword />
      </div>
    );
    return content;
  }
}