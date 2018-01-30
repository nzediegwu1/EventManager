import React, { Component } from 'react';
import { Sidebar } from './sidebarComponent';
import { NavBar } from './navBarComponent';
import { AddEvent } from './addEventComponent';
import { AddCenter } from './addCenterComponent';
import { MyCenters } from './myCenterComponent';

export class Dashboard extends Component {
  render() {
    const content = (
      <div className="appBackground">
        <NavBar />
        <div id="content" className="container custom-container">
          <Sidebar />
          <AddEvent />
          <AddCenter />
          <MyCenters />
        </div>
      </div>
    );
    return content;
  }
}