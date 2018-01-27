import React, { Component } from 'react';
import { Sidebar } from './sidebarComponent';
import { NavBar } from './navBarComponent';
import {AddEvent} from './addEventComponent';

export class Dashboard extends Component {
  render() {
    const content = (
      <div className="appBackground">
        <NavBar />
        <div id="content" className="container custom-container">
          <Sidebar />
          <AddEvent />
        </div>
      </div>
    );
    return content;
  }
}