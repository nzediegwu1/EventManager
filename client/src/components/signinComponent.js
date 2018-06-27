import React from 'react';
import { FormGroup } from './formGroup';
import { SignupForm } from './signupComponent';
import { RecoverPassword } from './rePasswordComponent';
import { Redirect } from 'react-router-dom';
import { onboarding, toastSettings, userValidator } from '../services';
import { connect } from 'react-redux';
import { setAccountType } from '../actions/userActions';
import { setSubmitState } from '../actions/submitAction';
import toastr from 'toastr';
import PropTypes from 'prop-types';

toastr.options = toastSettings;

const inputAttrs = (inputType, inputName, placeholder, className, ref, required) => ({
  inputType,
  inputName,
  placeholder,
  className,
  ref,
  required,
});

const mapDispatchToProps = dispatch => ({
  setAccountType: accountType => dispatch(setAccountType(accountType)),
  setSubmitState: submitState => dispatch(setSubmitState(submitState)),
});

const mapStateToProps = state => ({
  disabled: state.process.disabled,
  visibility: state.process.visibility,
});

class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signinView: 'block',
      signupView: 'none',
    };
  }
  componentWillUnmount() {
    this.props.setSubmitState('initial');
  }
  // When user clicks signup link, display signup component and hide signin component
  changeState = () => {
    this.setState(prevState => ({
      signinView: prevState.signinView === 'block' ? 'none' : 'block',
      signupView: prevState.signupView === 'none' ? 'block' : 'none',
    }));
  };

  handleSubmit = event => {
    event.preventDefault();
    const loginData = {
      username: this.username.value,
      password: this.password.value,
    };
    const validationStatus = userValidator(loginData, 'login');
    if (validationStatus === true) {
      this.props.setSubmitState('processing');
      // http request to signin
      onboarding(this.props, loginData, 'login', () => {
        this.props.setSubmitState('initial');
      });
    } else {
      toastr.error(validationStatus);
    }
  };
  render() {
    const content = (
      <div className="background-image" id="signinPage">
        <div className="container">
          <div id="titleDiv">
            <b className="main-title">EventManager</b>
          </div>
          <div id="loginPanel" className="mx-sm-auto col-sm-6">
            <div style={{ display: this.state.signupView }}>
              <SignupForm
                history={this.props.history}
                changeState={this.changeState}
                visibility={this.props.visibility}
                disabled={this.props.disabled}
                changeSubmitState={this.props.setSubmitState}
              />
            </div>
            <form
              onSubmit={this.handleSubmit}
              role="form"
              className="formDiv"
              id="signinForm"
              style={{ display: this.state.signinView }}
            >
              <h3 className="text-center panel-font">
                <b>Login</b>
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
              <button
                type="submit"
                id="login"
                className="btn btn-lg btn-primary btn-block submitButton"
                disabled={this.props.disabled}
              >
                <i className="fa fa-spinner fa-spin" style={{ display: this.props.visibility }} />
                &nbsp; Login
              </button>
              <div className="form-links">
                <a href="#" className="welcome" onClick={this.changeState}>
                  Create account
                </a>&nbsp; |&nbsp;
                <a href="#" data-toggle="modal" data-target="#resetPassword">
                  reset password
                </a>
              </div>
            </form>
          </div>
        </div>
        <RecoverPassword
          visibility={this.props.visibility}
          disabled={this.props.disabled}
          changeSubmitState={this.props.setSubmitState}
        />
      </div>
    );
    const token = localStorage.token;
    return token ? <Redirect to="/dashboard" /> : content;
  }
}

export const SignIn = connect(mapStateToProps, mapDispatchToProps)(SignInPage);
SignInPage.propTypes = {
  history: PropTypes.object,
  setSubmitState: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  visibility: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};
