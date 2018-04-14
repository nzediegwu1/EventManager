import React, { Component } from 'react';
import profileImage from '../resources/images/profile-image.png';
import axios from 'axios';
import { setProfileDetails } from '../actions/userActions';
import { connect } from 'react-redux';
import { apiLink } from '../reusables';
import { TableRow } from './table';

const mapStateToProps = state => ({
  profileDetails: state.user.profileDetails,
});
const mapDispatchToProps = dispatch => ({
  setProfileDetails: data => dispatch(setProfileDetails(data)),
});
const ProfileInput = props => {
  const content = (
    <div className="form-group row">
      <label className="col-lg-3 mx-sm-auto col-form-label form-control-label">{props.label}</label>
      <div className="col-lg-9 mx-sm-auto">
        <input
          className="form-control"
          defaultValue={props.value}
          type={props.type}
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
  return content;
};

class ProfileComponent extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const token = JSON.parse(localStorage.token);
    axios
      .get(`${apiLink}/api/v1/users/${token.id}`)
      .then(res => {
        this.props.setProfileDetails(res.data.data);
      })
      .catch(error => {
        alert(error);
        console.log(error.response);
      });
  }
  render() {
    const user = this.props.profileDetails[0];
    if (user === undefined) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    }
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
                  <h4 className="text-center">{user.name}</h4>
                  <div className="table-responsive">
                    <table className="table table-hover table-striped table-bordered">
                      <tbody>
                        <TableRow colNumber={2} columns={['Username', user.username]} />
                        <TableRow colNumber={2} columns={['Phone', user.phoneNo]} />
                        <TableRow colNumber={2} columns={['Email', user.email]} />
                        <TableRow colNumber={2} columns={['Address', user.address]} />
                        <TableRow colNumber={2} columns={['Company', user.company]} />
                        <TableRow colNumber={2} columns={['Website', user.website]} />
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="tab-pane edit-profile-form" id="edit">
                  <h4 className="text-center">Edit Profile</h4>
                  <form role="form">
                    <ProfileInput
                      label="Name"
                      type="text"
                      placeholder="Full name"
                      value={user.name}
                    />
                    <ProfileInput
                      label="Email"
                      type="text"
                      placeholder="Email"
                      value={user.email}
                    />
                    <ProfileInput
                      label="Company"
                      type="text"
                      placeholder="Company Name"
                      value={user.company}
                    />
                    <ProfileInput
                      label="Website"
                      type="url"
                      placeholder="www.andela.com"
                      value={user.website}
                    />
                    <ProfileInput
                      label="Address"
                      type="text"
                      placeholder="Full Address"
                      value={user.address}
                    />
                    <ProfileInput
                      label="Username"
                      type="text"
                      placeholder="Username"
                      value={user.username}
                    />
                    <ProfileInput label="Password" type="text" placeholder="Password" />
                    <ProfileInput
                      label="Confirm password"
                      type="text"
                      placeholder="Confirm password"
                    />
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
export const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
