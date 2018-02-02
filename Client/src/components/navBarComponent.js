import React, { Component } from 'react';
import menuIcon from '../resources/images/glyphicons-517-menu-hamburger.png';
import searchIcon from '../resources/images/glyphicons-28-search.png';
import createIcon from '../resources/images/glyphicons-191-plus-sign.png';

const NavbarList = (props) => {
  const content = (
    <li className="nav-item">
      <a id={props.id} className="nav-link" data-toggle="modal" data-target={props.dataTarget} href="#">
        {props.body}
        <img src={createIcon} alt="add" className="invert-color sidebar-toggle" />
      </a>
    </li>
  );
  return content;
}
export class NavBar extends Component {
  render() {
    const content = (
      <nav className="navbar fixed-top navbar-expand-sm navbar-background">
        <a href="#" data-toggle="modal" data-target="#myModalSidebar"><img src={menuIcon} className="invert-color sidebar-toggle" id="menu-toggle" /></a>
        <h4 className="appTitle">EventMgr</h4>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#navBody" aria-controls="navBody" aria-expanded="false">
          <img src={menuIcon} alt="hamburger" className="invert-color" />
        </button>
        <div className="collapse navbar-collapse collapsible" id="navBody">
          <form className="form-inline my-lg-0" id="searchFormGroup">
            <div style={{ display: 'flex' }}>
              <input className="form-control mr-sm-2 search-input" type="search" placeholder="Search an Event" aria-label="Search" />
              <button className="btn btn-outline-success search-events" id="searchEvents" type="submit">
                <img src={searchIcon} className="invert-color" />
              </button>
            </div>
          </form>
          <ul className="navbar-nav nav-pills nav-fill my-lg-0 ml-auto justify-content-center" id="nav-body">
            <NavbarList id='addEvent' dataTarget='#addNewEvent' body='Add Event' />
            <NavbarList id='addCenter' dataTarget='#addNewCenter' body='Add Center' />
          </ul>
        </div>
      </nav>
    );
    return content;
  }
}