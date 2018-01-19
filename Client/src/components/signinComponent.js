import React from 'react';

export default class SignIn extends React.Component {
  render() {
    const content = (
      <div className="background-image">
        <div className="container">
          <div id="titleDiv">
            <b className="main-title">EventManager</b>
          </div>
          <div id="loginPanel" className="mx-sm-auto col-sm-6">
            <form role="form" action="pages/MyEvents.html" className="formDiv">
              <h3 className="text-center panel-font"><b>Login</b></h3>
              <br />
              <div className="input-group">
                <span className="input-group-addon">
                  <img src="resources/images/glyphicons-522-user-lock.png" alt="username" />
                </span>
                <input type="text" name="username" placeholder="Username" required className="form-control input-lg" />
              </div><br />
              <div className="input-group">
                <span className="input-group-addon">
                  <img src="resources/images/glyphicons-204-lock.png" alt="password" />
                </span>
                <input type="password" className="form-control input-lg" id="password" placeholder="Password" required />
              </div>
              <button type="submit" className="btn btn-lg btn-primary btn-block submitButton">Sign in</button>
              <div className="form-links">
                <a href="pages/Signup.html">Create account</a> | <a href="#" data-toggle="modal" data-target="#resetPassword">reset password</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
    return content;
  }
}