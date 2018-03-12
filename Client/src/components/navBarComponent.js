import React, { Component } from 'react';
import menuIcon from '../resources/images/glyphicons-517-menu-hamburger.png';
import searchIcon from '../resources/images/glyphicons-28-search.png';
import createIcon from '../resources/images/glyphicons-191-plus-sign.png';
import { connect } from 'react-redux';
import {
  setModalTitle,
  setRequired,
  setEventDefaults,
  setCenterDefaults,
} from '../actions/pageActions';
import { initialState } from '../reducers/pageReducer';

const mapStateToProps = state => ({
  accountType: state.accountType.accountType,
});
const mapDispatchToProps = dispatch => ({
  setModalTitle: title => dispatch(setModalTitle(title)),
  setRequired: value => dispatch(setRequired(value)),
  setEventDefaults: data => dispatch(setEventDefaults(data)),
  setCenterDefaults: data => dispatch(setCenterDefaults(data)),
});

const NavbarList = props => {
  const content = (
    <li className="nav-item">
      <a
        id={props.id}
        onClick={props.setModalProps}
        className="nav-link"
        data-toggle="modal"
        data-target={props.dataTarget}
        href="#"
      >
        {props.body}
        <img src={createIcon} alt="add" className="invert-color sidebar-toggle" />
      </a>
    </li>
  );
  return content;
};
class NavBarItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const setModalProps = title => {
      this.props.setModalTitle(title);
      this.props.setRequired(true);
      title === 'New Event'
        ? this.props.setEventDefaults(initialState.eventDefaults)
        : this.props.setCenterDefaults(initialState.centerDefaults);
    };
    const content = (
      <nav className="navbar fixed-top navbar-expand-sm navbar-background">
        <a href="#" data-toggle="modal" data-target="#myModalSidebar">
          <img src={menuIcon} className="invert-color sidebar-toggle" id="menu-toggle" />
        </a>
        <h4 className="appTitle">EventMgr</h4>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navBody"
          aria-controls="navBody"
          aria-expanded="false"
        >
          <img src={menuIcon} alt="hamburger" className="invert-color" />
        </button>
        <div className="collapse navbar-collapse collapsible" id="navBody">
          <form className="form-inline my-lg-0" id="searchFormGroup">
            <div style={{ display: 'flex' }}>
              <input
                className="form-control mr-sm-2 search-input"
                type="search"
                placeholder="Search an Event"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success search-events"
                id="searchEvents"
                type="submit"
              >
                <img src={searchIcon} className="invert-color" />
              </button>
            </div>
          </form>
          <ul
            className="navbar-nav nav-pills nav-fill my-lg-0 ml-auto justify-content-center"
            id="nav-body"
          >
            <NavbarList
              setModalProps={() => setModalProps('New Event')}
              id="addEvent"
              dataTarget="#addNewEvent"
              body="Add Event"
            />
            {this.props.accountType === 'admin' && (
              <NavbarList
                setModalProps={() => setModalProps('New Center')}
                id="addCenter"
                dataTarget="#addNewCenter"
                body="Add Center"
              />
            )}
          </ul>
        </div>
      </nav>
    );
    return content;
  }
}
export const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarItem);
