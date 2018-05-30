import React from 'react';
import { FormGroup } from './formGroup';
import { connect } from 'react-redux';
import { setAccountType } from '../actions/userActions';
import { onboarding, toastSettings, userValidator } from '../services';
import toastr from 'toastr';
import PropTypes from 'prop-types';

toastr.options = toastSettings;

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
// all props are from signin component
class SignupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const signupData = {
      username: this.username.value,
      password: this.password.value,
      name: this.name.value,
      confirmPassword: this.rePassword.value,
      email: this.email.value,
      phoneNo: `+${this.phone.value}`,
      accountType: 'regular',
    };
    const validationStatus = userValidator(signupData, 'signup');
    if (validationStatus === true) {
      this.props.changeSubmitState('processing');
      onboarding(this.props, signupData, 'signup', () => {
        this.props.changeSubmitState('initial');
      });
    } else {
      toastr.error(validationStatus);
    }
  }

  render() {
    return (
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
            'email',
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
        <button
          type="submit"
          disabled={this.props.state.disabled}
          className="btn btn-lg btn-primary btn-block submitButton"
        >
          <i className="fa fa-spinner fa-spin" style={{ display: this.props.state.visibility }} />
          &nbsp; Signup
        </button>
        <div className="form-links">
          <a href="#" className="welcome" onClick={this.props.changeState}>
            Already have an account? Signin
          </a>
        </div>
      </form>
    );
  }
}
export const SignupForm = connect(null, mapDispatchToProps)(SignupComponent);
SignupComponent.propTypes = {
  changeSubmitState: PropTypes.func,
  state: PropTypes.object,
  changeState: PropTypes.func,
};
