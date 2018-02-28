import React from 'react';
import { FormGroup } from './formGroup';
import usernameIcon from '../resources/images/glyphicons-522-user-lock.png';
import userIcon from '../resources/images/glyphicons-4-user.png';
import emailIcon from '../resources/images/glyphicons-11-envelope.png';
import phoneIcon from '../resources/images/glyphicons-442-phone-alt.png';
import passwordIcon from '../resources/images/glyphicons-204-lock.png';
import axios from 'axios';
import { signin } from '../reusables';

const inputAttrs = (inputType, inputName, placeholder, className, ref, required) => {
  return { inputType, inputName, placeholder, className, ref, required };
};
let history;
export class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
    history = this.props.history;
  }
  validate(username, name, email, password, confirmPassword) {
    if (username.trim().length === 0) {
      alert('Username must not be empty');
    } else if (name.trim().length === 0) {
      alert('Name field must not be empty');
    } else if (email.trim().length === 0) {
      alert('Email field must not be empty');
    } else if (password.length < 6) {
      alert('Password must be up to 6 characters');
    } else if (password !== confirmPassword) {
      alert('passwords do not match');
    } else {
      return true;
    }
  }

  handleSubmit(event) {
    const username = this.username.value;
    const name = this.name.value;
    const email = this.email.value;
    const phoneNo = this.phone.value;
    const accountType = 'regular';
    const password = this.password.value;
    const confirmPassword = this.rePassword.value;
    if (this.validate(username, name, email, password, confirmPassword)) {
      axios.post('http://localhost:8080/api/v1/users', { username, name, email, phoneNo, accountType, password, confirmPassword })
        .then(res => {
          alert('Successful');
          signin(res, history);
        }).catch(err => {
          alert(err.response.data.message);
        })
    }
    event.preventDefault();
  }

  render() {
    const content = (
      <form role="form" onSubmit={this.handleSubmit} className="formDiv" id="signupForm">
        <h3 className="text-center panel-font"><b>Register</b></h3>
        <br />
        <FormGroup image={usernameIcon} alt='username' inputProps={inputAttrs('text', 'username', 'Username', 'form-control input-sm', input => this.username = input, 'required')} />
        <FormGroup image={userIcon} alt='fullname' inputProps={inputAttrs('text', 'fullname', 'Full name', 'form-control input-sm', input => this.name = input, 'required')} />
        <FormGroup image={emailIcon} alt='email' inputProps={inputAttrs('text', 'email', 'Email', 'form-control input-sm', input => this.email = input, 'required')} />
        <FormGroup image={phoneIcon} alt='phone' inputProps={inputAttrs('number', 'phone', 'Phone number', 'form-control input-sm', input => this.phone = input, 'required')} />
        <FormGroup image={passwordIcon} alt='password' inputProps={inputAttrs('password', 'password', 'Password', 'form-control input-sm', input => this.password = input, 'required')} />
        <FormGroup image={passwordIcon} alt='password' inputProps={inputAttrs('password', 'rePassword', 'Re-enter Password', 'form-control input-sm', input => this.rePassword = input, 'required')} />
        <button type="submit" className="btn btn-lg btn-primary btn-block submitButton">Signup</button>
        <div className="form-links">
          <a href="#" className="welcome" onClick={this.props.changeState}>Already have an account? Signin</a>
        </div>
      </form>
    );
    return content;
  }
}