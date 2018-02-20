import React, { Component } from 'react';
import { Sidebar } from './sidebarComponent';
import { NavBar } from './navBarComponent';
import { AddEvent } from './addEventComponent';
import { AddCenter } from './addCenterComponent';
import { MyCenters } from './centerListComponent';
import { Route, Switch, Redirect } from 'react-router-dom';
import { EventList } from './eventListComponent';
import { ManageEvent } from './manageEventComponent';
import { CenterDetails } from './centerDetailsComponent';
import { TestRedux } from './testRedux';

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
            <Route path={`${this.props.match.path}/testredux`} component={TestRedux} />
            <Route path={`${this.props.match.path}/centerlist`} component={MyCenters} />
            <Route path={`${this.props.match.path}/manage-event`} component={ManageEvent} />
            <Route path={`${this.props.match.path}/center-details`} component={CenterDetails} />
            <Route path={`${this.props.match.path}`} component={EventList} />
          </Switch>
        </div>
      </div>
    );
    const token = localStorage.token;
    return token? content : <Redirect to='/' />;
  }
}