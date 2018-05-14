import React, { Component } from 'react';
import Icon from './icon';
import createHistory from 'history/createBrowserHistory';
import { logout, getOne } from '../services';
import { connect } from 'react-redux';
import { setProfileDetails } from '../actions/userActions';

const mapDispatchToProps = dispatch => ({
  setProfileDetails: data => dispatch(setProfileDetails(data)),
});

const history = createHistory();
export const ListItem = props => (
  <li onClick={props.event} className={props.class}>
    <h6>
      <a className="nav-link" href="#">
        {props.title}
        <Icon src={props.icon} alt={props.alt} class="invert-color icon-margin-left" />
      </a>
    </h6>
  </li>
);
class SidebarComponent extends Component {
  constructor(props) {
    super(props);
    this.changeLocation = this.changeLocation.bind(this);
    this.userId = JSON.parse(localStorage.token).id;
  }
  changeLocation(url) {
    if (url === `${this.props.match.path}/profile/${this.userId}`) {
      const profileData = getOne(this.props, this.userId, 'users');
      this.props.setProfileDetails(profileData);
    }
    history.push(url);
    $('#myModalSidebar').modal('hide');
  }

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
                <b>Dashboard</b>
              </h5>
              <div data-dismiss="modal">
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
                  class="nav-item"
                  title="Events"
                  icon="glyphicons-619-mixed-buildings.png"
                  alt="myEvents"
                />
                <ListItem
                  event={this.changeLocation.bind(this, `${this.props.match.path}/centers`)}
                  class="nav-item"
                  title="Centers"
                  icon="glyphicons-503-map.png"
                  alt="myCenters"
                />
                <ListItem
                  event={this.changeLocation.bind(
                    this,
                    `${this.props.match.path}/profile/${this.userId}`
                  )}
                  class="nav-item"
                  title="MyProfile"
                  icon="glyphicons-4-user.png"
                  alt="myProfile"
                />
                {this.userId === 1 && (
                  <ListItem
                    event={this.changeLocation.bind(this, `${this.props.match.path}/userList`)}
                    class="nav-item"
                    title="All Users"
                    icon="glyphicons-44-group.png"
                    alt="userList"
                  />
                )}
                <ListItem
                  event={() => logout('myModalSidebar', this.props.history)}
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
export const Sidebar = connect(null, mapDispatchToProps)(SidebarComponent);
