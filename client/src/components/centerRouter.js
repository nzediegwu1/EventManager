import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { MyCenters } from './centerListComponent';
import { CenterDetails } from './centerDetailsComponent';

export class CenterRouter extends Component {
  render() {
    const content = (
      <Switch>
        <Route path={`${this.props.match.path}/:id`} component={CenterDetails} />
        <Route path={`${this.props.match.path}`} component={MyCenters} />
      </Switch>
    );
    return content;
  }
}
