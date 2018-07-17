import React from 'react';
import Icon from './icon';
import createHistory from 'history/createBrowserHistory';
import { logout, getOne } from '../services';
import { connect } from 'react-redux';
import { setProfileDetails } from '../actions/userActions';
import PropTypes from 'prop-types';
import { ListItem } from './listComponent';
import $ from 'jquery';
import 'bootstrap';


const history = createHistory();
export class SidebarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.userId = JSON.parse(localStorage.token).id;
  }
  /**
   * @description - Method for navigating within app
   *
   * @param {string} url - Url to the component path
   * @memberof SidebarComponent
   */
  changeLocation = url => {
    if (url === `${this.props.match.path}/profile/${this.userId}`) {
      const profileData = getOne(this.props, this.userId, 'users');
      this.props.setProfileDetails(profileData);
    }
    $('#myModalSidebar').modal('hide');
    history.push(url);
  };

  render() {
    return (
      <div
        className="modal left fade"
        id="myModalSidebar"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalSidebarLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content sidebar">
            <div className="modal-header  sidebar-header">
              <h5 className="modal-title">
                <b id="dashboard">Dashboard</b>
              </h5>
              <div data-dismiss="modal" id="toggle-sidebar">
                <Icon
                  src="glyphicons-198-remove-circle.png"
                  alt="close"
                  class="invert-color close"
                />
              </div>
            </div>
            <div className="modal-body">
              <ul className="nav flex-column nav-tabs">
                <ListItem
                  event={this.changeLocation.bind(this, `${this.props.match.path}`)}
                  class="nav-item first"
                  title="Events"
                  icon="glyphicons-619-mixed-buildings.png"
                  alt="myEvents"
                />
                <ListItem
                  event={this.changeLocation.bind(this, `${this.props.match.path}/centers`)}
                  class="nav-item center-list"
                  title="Centers"
                  icon="glyphicons-503-map.png"
                  alt="myCenters"
                />
                <ListItem
                  event={this.changeLocation.bind(
                    this,
                    `${this.props.match.path}/profile/${this.userId}`
                  )}
                  class="nav-item user-profile"
                  title="MyProfile"
                  icon="glyphicons-4-user.png"
                  alt="myProfile"
                />
                {this.userId === 1 && (
                  <ListItem
                    event={this.changeLocation.bind(this, `${this.props.match.path}/userList`)}
                    class="nav-item all-users"
                    title="All Users"
                    icon="glyphicons-44-group.png"
                    alt="userList"
                  />
                )}
                <ListItem
                  event={() => logout('#myModalSidebar', this.props.history)}
                  class="nav-item logout"
                  title="Logout"
                  icon="glyphicons-64-power.png"
                  alt="logout"
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export const mapDispatchToProps = dispatch => ({
  setProfileDetails: data => dispatch(setProfileDetails(data)),
});

export const Sidebar = connect(null, mapDispatchToProps)(SidebarComponent);
SidebarComponent.propTypes = {
  match: PropTypes.object,
  setProfileDetails: PropTypes.func,
  history: PropTypes.object,
};
