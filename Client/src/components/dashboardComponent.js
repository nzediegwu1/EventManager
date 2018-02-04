import React, { Component } from 'react';
import { Sidebar } from './sidebarComponent';
import { NavBar } from './navBarComponent';
import { AddEvent } from './addEventComponent';
import { AddCenter } from './addCenterComponent';
import { MyCenters } from './myCenterComponent';
import { Route, Switch } from 'react-router-dom';
import { EventList } from './eventListComponent';
import { ManageEvent } from './manageEventComponent';

export class Dashboard extends Component {
  render() {
    const content = (
      <div className="appBackground">
        <NavBar />
        <div id="content" className="container custom-container">
          <Sidebar />
          <AddEvent />
          <AddCenter />
          <Switch>
            <Route path={`${this.props.match.path}/centerlist`} component={MyCenters} />
            <Route path={`${this.props.match.path}/manage-event`} component={ManageEvent} />
            <Route path={`${this.props.match.path}`} component={EventList} />
          </Switch>
        </div>
      </div>
    );
    return content;
  }
}