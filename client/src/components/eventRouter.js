import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { EventList } from './eventListComponent';
import { ManageEvent } from './manageEventComponent';
import PropTypes from 'prop-types';

export class EventRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path={`${this.props.match.path}/events/:id`} component={ManageEvent} />
        <Route path={`${this.props.match.path}/events`} component={EventList} />
        <Redirect to={`${this.props.match.path}/events`} />
      </Switch>
    );
  }
}
EventRouter.propTypes = {
  match: PropTypes.object,
};
