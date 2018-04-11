import React, { Component } from 'react';
import profileImage from '../resources/images/profile-image.png';

export class Profile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const content = (
      <div className="card mx-sm-auto col-sm-11 profile-panel">
        <div className="card-header mg-event-header text-center">Manage Profile</div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-4 image-div">
              <img src={profileImage} className="profile-image img-circle" alt="avatar" />
              <h6 className="text-center">Upload a different photo</h6>
              <label className="custom-file">
                <input type="file" id="file" className="custom-file-input" />
                <span className="custom-file-control">Choose file</span>
              </label>
            </div>
            <div className="col-lg-8">
              <ul className="nav nav-tabs tab-style">
                <li className="nav-item profile-tab">
                  <a href="" data-target="#profile" data-toggle="tab" className="nav-link active">
                    Profile
                  </a>
                </li>
                <li className="nav-item profile-tab">
                  <a href="" data-target="#edit" data-toggle="tab" className="nav-link">
                    Edit
                  </a>
                </li>
              </ul>
              <br />
              <div className="tab-content">
                <div className="tab-pane active" id="profile">
                  <h4 className="text-center">Anaeze Nsoffor</h4>
                  <div className="table-responsive">
                    <table className="table table-hover table-striped table-bordered">
                      <tbody>
                        <tr>
                          <td>Username</td>
                          <td>nzediegwu1</td>
                        </tr>
                        <tr>
                          <td>Phone</td>
                          <td>2347067356519</td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td>nzediegwu1@gmail.com</td>
                        </tr>
                        <tr>
                          <td>Address</td>
                          <td>1/2 Pound Road, Aba, Abia State</td>
                        </tr>
                        <tr>
                          <td>Company</td>
                          <td>Andela Inc</td>
                        </tr>
                        <tr>
                          <td>Website</td>
                          <td>www.anaeze1.andela.com</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="tab-pane edit-profile-form" id="edit">
                  <h4 className="text-center">Edit Profile</h4>
                  <form role="form">
                    <div className="form-group row">
                      <label className="col-lg-3 mx-sm-auto col-form-label form-control-label">
                        Name
                      </label>
                      <div className="col-lg-9 mx-sm-auto">
                        <input className="form-control" type="text" placeholder="Full name" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 mx-sm-auto col-form-label form-control-label">
                        Email
                      </label>
                      <div className="col-lg-9 mx-sm-auto">
                        <input className="form-control" type="email" placeholder="Email" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 mx-sm-auto col-form-label form-control-label">
                        Company
                      </label>
                      <div className="col-lg-9 mx-sm-auto">
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 mx-sm-auto col-form-label form-control-label">
                        Website
                      </label>
                      <div className="col-lg-9 mx-sm-auto">
                        <input className="form-control" type="url" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 mx-sm-auto col-form-label form-control-label">
                        Address
                      </label>
                      <div className="col-lg-9 mx-sm-auto">
                        <input className="form-control" type="text" placeholder="Street" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 mx-sm-auto col-form-label form-control-label" />
                      <div className="col-lg-6">
                        <input className="form-control" type="text" placeholder="City" />
                      </div>
                      <div className="col-lg-3 mx-sm-auto">
                        <input className="form-control" type="text" placeholder="State" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 mx-sm-auto col-form-label form-control-label">
                        Username
                      </label>
                      <div className="col-lg-9 mx-sm-auto">
                        <input className="form-control" type="text" placeholder="Username" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 mx-sm-auto col-form-label form-control-label">
                        Password
                      </label>
                      <div className="col-lg-9 mx-sm-auto">
                        <input className="form-control" type="password" placeholder="Password" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 mx-sm-auto col-form-label form-control-label">
                        Confirm password
                      </label>
                      <div className="col-lg-9 mx-sm-auto">
                        <input className="form-control" type="password" placeholder="Confirm Password" />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="profile-edit-buttons">
                        <input
                          type="reset"
                          className="btn btn-secondary right-margin"
                          value="Cancel"
                        />
                        <input type="button" className="btn btn-primary" value="Save" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer mg-event-header text-center">@Event Manager 2018</div>
      </div>
    );
    return content;
  }
}
