import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect as Connect, useSelector } from 'react-redux';
import { Redirect, Route, Router, Switch, withRouter } from 'react-router-dom';
import { getRouterLocation } from '@/selectors';

export const Route2 = (_route) => {
  const location = useSelector((state) => getRouterLocation(state));

  if (_route && _route?.redirect) {
    return (
      <Redirect
        to={{
          pathname: _route?.redirect,
          state: { from: location.toJS() },
        }}
      />
    );
  }

  return (
    <Route
      path={_route.path}
      render={(props) => (
        <_route.component
          {...props}
          location={location}
          routes={_route.routes}
        />
      )}
    />
  );
};
