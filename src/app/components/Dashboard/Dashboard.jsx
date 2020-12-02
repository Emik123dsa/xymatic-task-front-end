/* eslint-disable no-dupe-keys */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect as Connect } from 'react-redux';
import { Subscription, Query } from 'react-apollo';
import { createClient } from 'graphql-ws';
import gql from 'graphql-tag';
import { isEmpty } from 'lodash';
import { getChartImpression } from '@/selectors';

import { loadChartsImpressionsEntity } from '@/actions';

import { Config } from '~/config';

const subscribe = `
  subscription {
    usersSubscribe {
      id
    }
  }
`;

@Connect(
  (state) => ({
    impressions: getChartImpression(state),
  }),
  {
    loadChartsImpressionsEntity,
  },
)
class Dashboard extends Component {
  static propTypes = {
    impressions: PropTypes.shape(),
    loadChartsImpressionsEntity: PropTypes.func,
  };

  componentDidMount() {
    this.props.loadChartsImpressionsEntity();
  }

  sendSchema = async () => {};

  render() {
    const { impressions } = this.props;

    if (!impressions.has('usersSubscribe')) {
      return <div>Loading ...</div>;
    }

    const _impressions = impressions.toJS();

    const items = _impressions.usersSubscribe.map((item) => (
      <li key={item.id}>{item.id}</li>
    ));

    return <div>{items}</div>;
  }
}

export default Dashboard;

// <Subscription subscription={subscribe}>
//   {(schema) => {
//     const { data, loading, error } = schema;
//     if (loading) return <div>Loading ... </div>;

//     if (error) return <div>Error</div>;

//     const { usersSubscribe } = data;

//     if (!usersSubscribe) return <div>Error</div>;

//     return usersSubscribe.map(({ id }) => <div key={id}>{id}</div>);
//   }}
// </Subscription>
