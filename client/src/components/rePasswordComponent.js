import React from 'react';
import { FormGroup } from './formGroup';
import { ModalHeader } from './modalHeader';
import { recoverPassword } from '../services';
import PropTypes from 'prop-types';

const inputAttrs = (inputType, inputName, placeholder, className, ref, required) => ({
  inputType,
  inputName,
  placeholder,
  className,
  ref,
  required,
});
export class RecoverPassword extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.changeSubmitState('processing');
    recoverPassword({ email: this.email.value }, () => {
      this.props.changeSubmitState('initial');
    });
  };

  render() {
    return (
      <div
        className="modal fade"
        id="resetPassword"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="resetPasswordLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <ModalHeader id="resetPasswordLabel" title="Recover Password" />
            <div className="modal-body  text-center">
              <h6>Enter your email to recover password</h6>
              <form onSubmit={this.handleSubmit} className="form">
                <fieldset>
                  <FormGroup
                    image="glyphicons-11-envelope.png"
                    alt="email"
                    inputProps={inputAttrs(
                      'email',
                      'email',
                      'email address',
                      'form-control input-sm',
                      input => (this.email = input),
                      'required'
                    )}
                  />
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-lg btn-primary btn-block modal-theme send-password"
                      disabled={this.props.disabled}
                    >
                      <i
                        className="fa fa-spinner fa-spin"
                        style={{ display: this.props.visibility }}
                      />
                      &nbsp; Recover Password
                    </button>
                  </div>
                </fieldset>
                <div className="modal-footer modal-theme">
                  <button type="button" className="btn btn-danger" data-dismiss="modal">
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
RecoverPassword.propTypes = {
  changeSubmitState: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  visibility: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};
