import React, { Component } from 'react';
import { Sidebar } from './sidebarComponent';
import { NavBar } from './navBarComponent';

export class Dashboard extends Component {
  render() {
    const content = (
      <div className="appBackground">
        <NavBar />
        <div id="content" className="container custom-container">
          <Sidebar />
        </div>
      </div>
    );
    return content;
  }
}