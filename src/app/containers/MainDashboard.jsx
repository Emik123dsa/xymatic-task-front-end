import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect as Connect } from 'react-redux';
import { AsyncComponent } from '@/shared/coerced.actions';
import { getRouterLocation, Period } from '@/selectors';

import {
  resetChartsEntities,
  loadChartsUsersEntity,
  loadChartsPostsEntity,
  loadChartsPlaysEntity,
  loadChartsImpressionsEntity,
  loadChartRowsAmountEntity,
} from '@/actions';

@Connect(
  (state) => ({
    location: getRouterLocation(state),
  }),
  {
    loadChartsUsersEntity,
    loadChartsPostsEntity,
    loadChartsPlaysEntity,
    loadChartsImpressionsEntity,
    loadChartRowsAmountEntity,
    resetChartsEntities,
  },
)
export default class MainDashboard extends Component {
  static propTypes = {
    loadChartsUsersEntity: PropTypes.func,
    loadChartsPostsEntity: PropTypes.func,
    loadChartsPlaysEntity: PropTypes.func,
    loadChartsImpressionsEntity: PropTypes.func,

    resetChartsEntities: PropTypes.func,
  };

  componentWillUnmount() {
    this.props.resetChartsEntities('ALL');
  }

  /**
   ** Subscribe to the
   ** WebSocket via Redux Saga,
   ** all of the changes are going into
   ** over Redux Store and mutating here as well
   */

  componentDidMount() {
    try {
      const pseudoKeys = Reflect.ownKeys(this.props);
      if (!Array.isArray(pseudoKeys)) throw new RangeError(pseudoKeys);
      pseudoKeys.forEach((key) => {
        const callback = this.props[key];
        if (callback instanceof Function && !key.startsWith('reset'))
          callback(Period.AllTime);
      });
    } catch (e) {
      console.error('[GraphQL]: Init Error');
    }
  }

  render() {
    return <AsyncComponent name="Dashboard" />;
  }
}
