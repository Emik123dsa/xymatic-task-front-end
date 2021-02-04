import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect as Connect } from 'react-redux';
import { Router, Switch, withRouter } from 'react-router-dom';
import { getRouterLocation } from '@/selectors';
import { CoercedRoute } from '@/shared/coerced.route';

@withRouter
@Connect(
  (state) => ({
    location: getRouterLocation(state),
  }),
  null,
)
export class Route2 extends Component {
  static propTypes = {
    location: PropTypes.shape().isRequired,
    routes: PropTypes.array,
    history: PropTypes.object,
  };

  render() {
    const { routes, history } = this.props;

    return (
      <Switch>
        {routes.map((route) => (
          <CoercedRoute key={route.path} route={route} history={history} />
        ))}
      </Switch>
    );
  }
}
