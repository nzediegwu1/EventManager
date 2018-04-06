import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { EventList } from './eventListComponent';
import { ManageEvent } from './manageEventComponent';

export class EventRouter extends Component {
  render() {
    const content = (
      <Switch>
        <Route path={`${this.props.match.path}/events/:id`} component={ManageEvent} />
        <Route path={`${this.props.match.path}/events`} component={EventList} />
        <Redirect to={`${this.props.match.path}/events`} />
      </Switch>
    );
    return content;
  }
}
