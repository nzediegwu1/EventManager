import React from 'react';
import { FormGroup } from './formGroup';
import emailIcon from '../resources/images/glyphicons-11-envelope.png';
import { ModalHeader } from './modalHeader';

const inputAttrs = (inputType, inputName, placeholder, className, required) => {
  return { inputType, inputName, placeholder, className, required };
};
export class RecoverPassword extends React.Component {
  render() {
    const content = (
      <div className="modal fade" id="resetPassword" tabIndex="-1" role="dialog" aria-labelledby="resetPasswordLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <ModalHeader id='resetPasswordLabel' title='Recover Password' />
            <div className="modal-body  text-center">
              <h6>Enter your email to recover password</h6>
              <form className="form">
                <fieldset>
                  <FormGroup image={emailIcon} alt='email' inputProps={inputAttrs('text', 'email', 'email address', 'form-control input-sm', 'required')} />
                  <div className="form-group">
                    <input className="btn btn-lg btn-primary btn-block modal-theme send-password" value="Recover Password" type="submit" />
                  </div>
                </fieldset>
              </form>
            </div>
            <div className="modal-footer modal-theme">
              <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
    return content;
  }
}