import React, { Component } from 'react';
import removeIcon from '../resources/images/glyphicons-198-remove-circle.png';
import eventIcon from '../resources/images/glyphicons-619-mixed-buildings.png';
import centerIcon from '../resources/images/glyphicons-503-map.png';
import userIcon from '../resources/images/glyphicons-4-user.png';
import logoutIcon from '../resources/images/glyphicons-64-power.png';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
export const ListItem = (props) => {
  const content = (
    <li onClick={props.event} className={props.class}>
      <h6>
        <a className="nav-link" href="#">{props.title}
          <img className="invert-color icon-margin-left" src={props.icon} alt={props.alt} />
        </a>
      </h6>
    </li>
  );
  return content;
}
export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.changeLocation = this.changeLocation.bind(this);
    this.logout = this.logout.bind(this);
  }
  changeLocation(url) {
    history.push(url);
  }
  logout() {
    $('#myModalSidebar').modal('hide');    
    localStorage.removeItem('token');
    history.push('/');
  }
  render() {
    const content = (
      <div className="modal left fade" id="myModalSidebar" tabIndex="-1" role="dialog" aria-labelledby="myModalSidebarLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content sidebar">
            <div className="modal-header  sidebar-header">
              <h5 className="modal-title">
                <b>Dashboard</b>
              </h5>
              <img className="invert-color close" data-dismiss="modal" src={removeIcon} />
            </div>
            <div className="modal-body">
              <ul className="nav flex-column nav-tabs">
                <ListItem event={this.changeLocation.bind(this, '/dashboard')} class='nav-item' title='MyEvents' icon={eventIcon} alt='myEvents' />
                <ListItem event={this.changeLocation.bind(this, '/dashboard/centerlist')} class='nav-item' title='MyCenters' icon={centerIcon} alt='myCenters' />
                <ListItem event={this.changeLocation.bind(this, '/dashboard/testredux')} class='nav-item' title='MyProfile' icon={userIcon} alt='myProfile' />
                <ListItem event={this.logout} class='nav-item logout' title='Logout' icon={logoutIcon} alt='logout' />
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
    return content
  }
}