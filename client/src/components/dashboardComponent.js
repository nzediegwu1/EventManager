import React, { Component } from 'react';
import { Sidebar } from './sidebarComponent';
import { NavBar } from './navBarComponent';
import { AddEvent } from './addEventComponent';
import { AddCenter } from './addCenterComponent';
import { Route, Switch, Redirect } from 'react-router-dom';
import { EventRouter } from './eventRouter';
import { CenterRouter } from './centerRouter';
import { connect } from 'react-redux';
import { Profile } from './profileComponent';
import { apiLink } from '../reusables';
import { setProfileDetails } from '../actions/userActions';
import axios from 'axios';

const mapStateToProps = state => ({
  accountType: state.user.accountType,
});
const mapDispatchToProps = dispatch => ({
  setProfileDetails: data => dispatch(setProfileDetails(data)),
});
class DashboardComponent extends Component {
  componentWillMount() {
    const userId = JSON.parse(localStorage.token).id;
    axios
      .get(`${apiLink}/api/v1/users/${userId}`)
      .then(res => {
        this.props.setProfileDetails(res.data.data);
        // alert('user profile gotten!');
      })
      .catch(error => {
        alert(error);
        console.log(error.response);
      });
  }
  render() {
    const content = (
      <div className="appBackground">
        <NavBar />
        <div id="content" className="container custom-container">
          <Route path={`${this.props.match.path}`} component={Sidebar} />
          <Route path={`${this.props.match.path}`} component={AddEvent} />
          {(this.props.accountType === 'admin' || this.props.accountType === 'super') && (
            <Route path={`${this.props.match.path}`} component={AddCenter} />
          )}
          <Switch>
            <Route path={`${this.props.match.path}/profile`} component={Profile} />
            <Route path={`${this.props.match.path}/centers`} component={CenterRouter} />
            <Route path={`${this.props.match.path}`} component={EventRouter} />
          </Switch>
        </div>
      </div>
    );
    const token = localStorage.token;
    return token ? content : <Redirect to="/" />;
  }
}

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
