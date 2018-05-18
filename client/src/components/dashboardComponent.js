import React from 'react';
import { Sidebar } from './sidebarComponent';
import { NavBar } from './navBarComponent';
import { AddEvent } from './addEventComponent';
import { AddCenter } from './addCenterComponent';
import { Route, Switch, Redirect } from 'react-router-dom';
import { EventRouter } from './eventRouter';
import { CenterRouter } from './centerRouter';
import { UserList } from './userListComponent';
import { connect } from 'react-redux';
import { Profile } from './profileComponent';

const mapStateToProps = state => ({
  accountType: state.users.accountType,
});
class DashboardComponent extends React.Component {
  render() {
    const userId = localStorage.token ? JSON.parse(localStorage.token).id : undefined;
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
            <Route path={`${this.props.match.path}/profile/:id`} component={Profile} />
            <Route path={`${this.props.match.path}/centers`} component={CenterRouter} />
            {userId === 1 && (
              <Route path={`${this.props.match.path}/userList`} component={UserList} />
            )}
            <Route path={`${this.props.match.path}`} component={EventRouter} />
          </Switch>
        </div>
      </div>
    );
    const token = localStorage.token;
    return token ? content : <Redirect to="/" />;
  }
}

export const Dashboard = connect(mapStateToProps)(DashboardComponent);
