import React from 'react';
import { FormGroup } from './formGroup';
import { ModalHeader } from './modalHeader';
import { recoverPassword } from '../services';

const inputAttrs = (inputType, inputName, placeholder, className, ref, required) => ({
  inputType,
  inputName,
  placeholder,
  className,
  ref,
  required,
});
export class RecoverPassword extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    recoverPassword({ email: this.email.value });
    $('#resetPassword').modal('hide');
  }
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
                    <input
                      className="btn btn-lg btn-primary btn-block modal-theme send-password"
                      value="Recover Password"
                      type="submit"
                    />
                  </div>
                </fieldset>
                <div className="modal-footer modal-theme">
                  <button type="submit" className="btn btn-danger">
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
