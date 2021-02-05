import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect as Connect, useSelector } from 'react-redux';
import { Route, Router, Switch, withRouter } from 'react-router-dom';
import { getRouterLocation } from '@/selectors';

export const Route2 = (_route) => {
  const location = useSelector((state) => getRouterLocation(state));
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
