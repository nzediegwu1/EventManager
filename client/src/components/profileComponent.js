import React from 'react';
import { setProfileDetails } from '../actions/userActions';
import { setSubmitState } from '../actions/submitAction';
import { connect } from 'react-redux';
import { apiLink, Transactions, getOne, userValidator, toastSettings } from '../services';
import { TableRow } from './table';
import { Option } from './selectOption';
import toastr from 'toastr';
import PropTypes from 'prop-types';

toastr.options = toastSettings;

const mapStateToProps = state => ({
  profileDetails: state.users.profileDetails,
  disabled: state.process.disabled,
  visibility: state.process.visibility,
});
const mapDispatchToProps = dispatch => ({
  setProfileDetails: data => dispatch(setProfileDetails(data)),
  setSubmitState: submitState => dispatch(setSubmitState(submitState)),
});
const ProfileInput = props => (
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
let profileData;
let accountType;
class ProfileComponent extends React.Component {
  // Handle profile image upload
  uploadPic = e => {
    if (e.target.files[0]) {
      const props = this.props;
      props.setSubmitState('processing');
      const folder = apiLink === 'http://localhost:8080' ? 'dev/profile' : 'prod/profile';
      const imageData = new FormData();
      const publicId = `${Date.now()}-${e.target.files[0].name}`;
      imageData.append('file', e.target.files[0]);
      imageData.append('tags', 'profileImage');
      imageData.append('upload_preset', `${process.env.UPLOAD_PRESET}`);
      imageData.append('api_key', `${process.env.API_KEY}`);
      imageData.append('timestamp', (Date.now() / 1000) | 0);
      imageData.append('folder', folder);
      imageData.append('public_id', publicId);
      const token = JSON.parse(localStorage.token).value;
      const transactions = new Transactions(props, 'profilePic');
      /**
       * @description - Handle image commit to database
       *
       * @param {object} res
       */
      const saveImage = res => {
        const profileUpdate = {
          picture: res.data.secure_url,
          publicId: res.data.public_id,
          token,
        };
        transactions.addOrUpdate(null, profileUpdate, () => {
          props.setSubmitState('initial');
          profileData = props.profileDetails[0];
        });
      };
      transactions.uploadImage(imageData, saveImage, () => {
        props.setSubmitState('initial');
      });
    }
  };
  upgradeAccount = () => {
    const account = this.account.value;
    const transactions = new Transactions(this.props, 'upgrade');
    transactions.addOrUpdate(profileData.id, account);
    profileData = this.props.profileDetails[0];
  };
  componentDidMount() {
    const userId = this.props.match.params.id;
    getOne(this.props, userId, 'users');
    profileData = this.props.profileDetails[0];
  }
  reset = () => {
    this.props.setProfileDetails(profileData);
  };

  handleSubmit = event => {
    event.preventDefault();
    const props = this.props;
    const profileInputs = {
      username: this.username.value,
      name: this.name.value,
      email: this.email.value,
      phoneNo: `+${this.phoneNo.value}`,
      company: this.company.value,
      website: this.website.value,
      address: this.address.value,
      password: this.password.value,
      confirmPassword: this.confirmPassword.value,
    };
    const validationStatus = userValidator(profileInputs, 'profile');
    if (validationStatus === true) {
      props.setSubmitState('processing');
      const transactions = new Transactions(props, 'profile');
      transactions.addOrUpdate(null, profileInputs, () => {
        props.setSubmitState('initial');
        profileData = props.profileDetails[0];
      });
    } else {
      toastr.error(validationStatus);
    }
  };
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
    return (
      <div className="card mx-sm-auto col-sm-11 profile-panel">
        <div className="card-header mg-event-header text-center">Manage Profile</div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-4 image-div">
              <img
                src={user.picture === null ? `${apiLink}/images/profile-image.png` : user.picture}
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
                      disabled={this.props.disabled}
                    />
                    <span className="custom-file-control">
                      <i
                        className="fa fa-spinner fa-spin"
                        style={{ display: this.props.visibility }}
                      />
                      &nbsp;Choose file
                    </span>
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
                        <TableRow columns={['Username', user.username]} />
                        <TableRow columns={['Phone', user.phoneNo]} />
                        <TableRow columns={['Email', user.email]} />
                        <TableRow columns={['Address', user.address]} />
                        <TableRow columns={['Company', user.company]} />
                        <TableRow columns={['Website', user.website]} />
                        <TableRow columns={['Account', accountType]} />
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
                      type="email"
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
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={this.props.disabled}
                        >
                          <i
                            className="fa fa-spinner fa-spin"
                            style={{ display: this.props.visibility }}
                          />
                          &nbsp; Save
                        </button>
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
  }
}
export const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
ProfileComponent.propTypes = {
  setProfileDetails: PropTypes.func,
  profileDetails: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  visibility: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  match: PropTypes.object,
};
ProfileInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  require: PropTypes.string,
  action: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
};
