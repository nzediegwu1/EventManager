import React, { Component } from 'react';
import { Sidebar } from './sidebarComponent';
import { NavBar } from './navBarComponent';
import { AddEvent } from './addEventComponent';
import { AddCenter } from './addCenterComponent';
import { MyCenters } from './myCenterComponent';
import { Route } from 'react-router-dom';


export class Dashboard extends Component {
  render() {
    const content = (
      <div className="appBackground">
        <NavBar />
        <div id="content" className="container custom-container">
          <Sidebar />
          <AddEvent />
          <AddCenter />
          <Route path={`${this.props.match.path}/centerlist`} component={MyCenters} />
        </div>
      </div>
    );
    return content;
  }
}