import React from 'react';

export default class RecoverPassword extends React.Component {
  render() {
    const content = (
      <div className="modal fade" id="resetPassword" tabindex="-1" role="dialog" aria-labelledby="resetPasswordLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header modal-theme">
              <h5 className="modal-title" id="resetPasswordLabel"><b>Recover Password</b></h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body  text-center">
              <h4>Forgot Password?</h4>
              <p>Enter your email to recover password</p>
              <form className="form">
                <fieldset>
                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <img src="resources/images/glyphicons-11-envelope.png" alt="username" />
                      </span>
                      <input id="emailInput" placeholder="email address" className="form-control email-input" required type="email" />
                      <div className="form-group">
                        <input className="btn btn-lg btn-primary btn-block modal-theme send-password" value="Recover Password" type="submit" />
                      </div>
                    </div>
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