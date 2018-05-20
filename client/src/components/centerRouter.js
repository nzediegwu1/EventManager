import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MyCenters } from './centerListComponent';
import { CenterDetails } from './centerDetailsComponent';
import PropTypes from 'prop-types';

export class CenterRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path={`${this.props.match.path}/:id`} component={CenterDetails} />
        <Route path={`${this.props.match.path}`} component={MyCenters} />
      </Switch>
    );
  }
}
CenterRouter.propTypes = {
  match: PropTypes.object,
};
