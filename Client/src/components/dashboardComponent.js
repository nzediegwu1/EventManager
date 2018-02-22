import React, { Component } from 'react';
import { Sidebar } from './sidebarComponent';
import { NavBar } from './navBarComponent';
import { AddEvent } from './addEventComponent';
import { AddCenter } from './addCenterComponent';
import { Route, Switch, Redirect } from 'react-router-dom';
import { EventRouter } from './eventRouter';
import { CenterRouter } from './centerRouter';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    accountType: state.accountType.accountType
  };
};

class DashboardComponent extends Component {
  render() {
    const content = (
      <div className="appBackground">
        <NavBar />
        <div id="content" className="container custom-container">
          <Route path={`${this.props.match.path}`} component={Sidebar} />
          <AddEvent />
          {(this.props.accountType === 'admin') && <AddCenter />}
          <Switch>
            <Route path={`${this.props.match.path}/centers`} component={CenterRouter} />
            <Route path={`${this.props.match.path}`} component={EventRouter} />
          </Switch>
        </div>
      </div>
    );
    const token = localStorage.token;
    return token ? content : <Redirect to='/' />;
  }
}

export const Dashboard = connect(mapStateToProps)(DashboardComponent);