import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export class CoercedRoute extends Component {
  static propTypes = {
    route: PropTypes.shape().isRequired,
    history: PropTypes.shape(),
    location: PropTypes.shape(),
    computedMatch: PropTypes.shape(),
  };

  /**
   *
   * react-router-config doesn't
   * want to handle all of the authenticated
   * routes anymore
   *
   * @returns
   * @memberof CoercedRoute
   */
  render() {
    const { route } = this.props;

    return (
      <Route
        {...this.props}
        render={(props) => {
          console.log(props);
          return (
            route.component && (
              <route.component
                route={route}
                routes={route && route.routes ? route.routes : []}
                {...props}
              />
            )
          );
        }}
      />
    );
  }
}
