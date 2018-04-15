import React, { Component } from 'react';
import profileImage from '../resources/images/profile-image.png';
import axios from 'axios';
import { setProfileDetails } from '../actions/userActions';
import { connect } from 'react-redux';
import { apiLink, logout } from '../reusables';
import { TableRow } from './table';
import { Option } from './selectOption';

const mapStateToProps = state => ({
  profileDetails: state.users.profileDetails,
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
          ref={props.action}
          required={!!props.require}
        />
      </div>
    </div>
  );
  return content;
};
let profileData;
let accountType;
let setProfData;
class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reset = this.reset.bind(this);
    this.upgradeAccount = this.upgradeAccount.bind(this);
  }
  uploadPic(e) {
    const folder = apiLink === 'http://localhost:8080' ? 'dev/profile' : 'prod/profile';
    const imageData = new FormData();
    const publicId = `${Date.now()}-${e.target.files[0].name}`;
    imageData.append('file', e.target.files[0]);
    imageData.append('tags', 'profileImage');
    imageData.append('upload_preset', 'm4vlbdts');
    imageData.append('api_key', '789891965151338');
    imageData.append('timestamp', (Date.now() / 1000) | 0);
    imageData.append('folder', folder);
    imageData.append('public_id', publicId);
    const token = JSON.parse(localStorage.token).value;
    axios
      .post('https://api.cloudinary.com/v1_1/eventmanager/image/upload', imageData)
      .then(res => {
        const profileUpdate = {
          picture: res.data.secure_url,
          publicId: res.data.public_id,
          token,
        };
        axios
          .put(`${apiLink}/api/v1/users/changePic`, profileUpdate)
          .then(response => {
            profileData = response.data.data;
            setProfData(profileData);
            alert('image upload successful');
          })
          .catch(err => {
            alert(err);
            console.log(err);
          });
      })
      .catch(error => {
        alert(error);
      });
  }
  upgradeAccount() {
    const token = JSON.parse(localStorage.token).value;
    axios
      .put(
        `${apiLink}/api/v1/users/${profileData.id}/upgrade/?token=${token}&accountType=${
          this.account.value
        }`
      )
      .then(res => {
        profileData = res.data.data;
        this.props.setProfileDetails(profileData);
        alert('Successfully upgraded');
      })
      .catch(err => {
        alert(err);
        (err.response.status === 403 || err.response.status === 401) &&
          logout('addNewCenter', this.props.history);
      });
  }
  componentWillMount() {
    const userId = this.props.match.params.id;
    axios
      .get(`${apiLink}/api/v1/users/${userId}`)
      .then(res => {
        profileData = res.data.data;
        setProfData = this.props.setProfileDetails;
        this.props.setProfileDetails(profileData);
        // alert('user profile gotten!');
      })
      .catch(error => {
        alert(error);
        console.log(error.response);
      });
  }
  reset() {
    this.props.setProfileDetails(profileData);
  }
  handleSubmit(event) {
    event.preventDefault();
    const token = JSON.parse(localStorage.token).value;
    const profileInputs = {
      username: this.username.value,
      name: this.name.value,
      email: this.email.value,
      phoneNo: this.phoneNo.value,
      company: this.company.value,
      website: this.website.value,
      address: this.address.value,
      password: this.password.value,
      confirmPassword: this.confirmPassword.value,
    };
    axios
      .put(`${apiLink}/api/v1/users/?token=${token}`, profileInputs)
      .then(res => {
        profileData = res.data.data;
        this.props.setProfileDetails(profileData);
        alert('Successfully saved!');
      })
      .catch(err => {
        typeof err.response.data.message !== 'object' &&
          alert(JSON.stringify(err.response.data.message));
        (err.response.status === 403 || err.response.status === 401) &&
          logout('addNewCenter', this.props.history);
      });
  }
  render() {
    const user = this.props.profileDetails[0];
    profileData = user;
    if (user === undefined) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    }
    const userId = JSON.parse(localStorage.token).id;
    if (userId === 1 && user.id !== 1) {
      accountType = (
        <select
          ref={input => (this.account = input)}
          defaultValue={user.accountType}
          className="custom-select-sm"
          onChange={this.upgradeAccount}
        >
          <Option value="admin" text="admin" />
          <Option value="regular" text="regular" />
        </select>
      );
    } else {
      accountType = user.accountType;
    }
    const content = (
      <div className="card mx-sm-auto col-sm-11 profile-panel">
        <div className="card-header mg-event-header text-center">Manage Profile</div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-4 image-div">
              <img
                src={user.picture === null ? profileImage : user.picture}
                className="profile-image img-circle"
                alt="avatar"
              />
              {userId === user.id && (
                <div>
                  <h6 className="text-center">Upload a different photo</h6>
                  <label className="custom-file">
                    <input
                      type="file"
                      id="file"
                      onChange={this.uploadPic}
                      className="custom-file-input"
                    />
                    <span className="custom-file-control">Choose file</span>
                  </label>
                </div>
              )}
            </div>
            <div className="col-lg-8">
              <ul className="nav nav-tabs tab-style">
                <li className="nav-item profile-tab">
                  <a href="" data-target="#profile" data-toggle="tab" className="nav-link active">
                    Profile
                  </a>
                </li>
                {userId === user.id && (
                  <li className="nav-item profile-tab">
                    <a
                      href=""
                      onClick={() => $('#reset').click()}
                      data-target="#edit"
                      data-toggle="tab"
                      className="nav-link"
                    >
                      Edit
                    </a>
                  </li>
                )}
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
                        <TableRow colNumber={2} columns={['Account', accountType]} />
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="tab-pane edit-profile-form" id="edit">
                  <h4 className="text-center">Edit Profile</h4>
                  <form role="form" onSubmit={this.handleSubmit}>
                    <ProfileInput
                      label="Name"
                      type="text"
                      placeholder="Full name"
                      action={input => (this.name = input)}
                      require="required"
                      value={user.name}
                    />
                    <ProfileInput
                      label="Email"
                      type="text"
                      placeholder="Email"
                      action={input => (this.email = input)}
                      require="required"
                      value={user.email}
                    />
                    <ProfileInput
                      label="Phone"
                      type="number"
                      placeholder="Phone"
                      action={input => (this.phoneNo = input)}
                      require="required"
                      value={user.phoneNo}
                    />
                    <ProfileInput
                      label="Company"
                      type="text"
                      placeholder="Company Name"
                      action={input => (this.company = input)}
                      value={user.company}
                    />
                    <ProfileInput
                      label="Website"
                      type="url"
                      placeholder="http://www.andela.com"
                      action={input => (this.website = input)}
                      value={user.website}
                    />
                    <ProfileInput
                      label="Address"
                      type="text"
                      placeholder="Full Address"
                      action={input => (this.address = input)}
                      value={user.address}
                    />
                    <ProfileInput
                      label="Username"
                      type="text"
                      placeholder="Username"
                      action={input => (this.username = input)}
                      require="required"
                      value={user.username}
                    />
                    <ProfileInput
                      label="Password"
                      type="password"
                      placeholder="Password"
                      action={input => (this.password = input)}
                      require="required"
                    />
                    <ProfileInput
                      label="Confirm password"
                      type="password"
                      placeholder="Confirm password"
                      action={input => (this.confirmPassword = input)}
                      require="required"
                    />
                    <div className="form-group">
                      <div className="profile-edit-buttons">
                        <input
                          id="reset"
                          type="reset"
                          className="btn btn-secondary right-margin"
                          value="Reset"
                          onClick={this.reset}
                        />
                        <input type="submit" className="btn btn-primary" value="Save" />
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
