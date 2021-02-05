import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect as Connect } from 'react-redux';
import { AsyncComponent } from '@/shared/coerced.actions';
import { getRouterLocation } from '@/selectors';

@Connect(
  (state) => ({
    location: getRouterLocation(state),
  }),
  null,
)
export default class MainDashboard extends Component {
  render() {
    return <AsyncComponent name="Dashboard" />;
  }
}
