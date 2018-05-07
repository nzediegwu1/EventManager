import React from 'react';
import { FormGroup } from './formGroup';
import { connect } from 'react-redux';
import { setAccountType } from '../actions/userActions';
import { onboarding } from '../services';

const mapDispatchToProps = dispatch => ({
  setAccountType: accountType => dispatch(setAccountType(accountType)),
});

const inputAttrs = (inputType, inputName, placeholder, className, ref, required) => ({
  inputType,
  inputName,
  placeholder,
  className,
  ref,
  required,
});
class SignupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
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
    event.preventDefault();
    const username = this.username.value;
    const name = this.name.value;
    const email = this.email.value;
    const phoneNo = this.phone.value;
    const accountType = 'regular';
    const password = this.password.value;
    const confirmPassword = this.rePassword.value;
    if (this.validate(username, name, email, password, confirmPassword)) {
      const data = {
        username,
        name,
        email,
        phoneNo,
        accountType,
        password,
        confirmPassword,
      };
      onboarding(this.props, data, 'signup');
    }
  }

  render() {
    const content = (
      <form role="form" onSubmit={this.handleSubmit} className="formDiv" id="signupForm">
        <h3 className="text-center panel-font">
          <b>Register</b>
        </h3>
        <br />
        <FormGroup
          image="glyphicons-522-user-lock.png"
          alt="username"
          inputProps={inputAttrs(
            'text',
            'username',
            'Username',
            'form-control input-sm',
            input => (this.username = input),
            'required'
          )}
        />
        <FormGroup
          image="glyphicons-4-user.png"
          alt="fullname"
          inputProps={inputAttrs(
            'text',
            'fullname',
            'Full name',
            'form-control input-sm',
            input => (this.name = input),
            'required'
          )}
        />
        <FormGroup
          image="glyphicons-11-envelope.png"
          alt="email"
          inputProps={inputAttrs(
            'text',
            'email',
            'Email',
            'form-control input-sm',
            input => (this.email = input),
            'required'
          )}
        />
        <FormGroup
          image="glyphicons-442-phone-alt.png"
          alt="phone"
          inputProps={inputAttrs(
            'number',
            'phone',
            'Phone number',
            'form-control input-sm',
            input => (this.phone = input),
            'required'
          )}
        />
        <FormGroup
          image="glyphicons-204-lock.png"
          alt="password"
          inputProps={inputAttrs(
            'password',
            'password',
            'Password',
            'form-control input-sm',
            input => (this.password = input),
            'required'
          )}
        />
        <FormGroup
          image="glyphicons-204-lock.png"
          alt="password"
          inputProps={inputAttrs(
            'password',
            'rePassword',
            'Re-enter Password',
            'form-control input-sm',
            input => (this.rePassword = input),
            'required'
          )}
        />
        <button type="submit" className="btn btn-lg btn-primary btn-block submitButton">
          Signup
        </button>
        <div className="form-links">
          <a href="#" className="welcome" onClick={this.props.changeState}>
            Already have an account? Signin
          </a>
        </div>
      </form>
    );
    return content;
  }
}
export const SignupForm = connect(null, mapDispatchToProps)(SignupComponent);
