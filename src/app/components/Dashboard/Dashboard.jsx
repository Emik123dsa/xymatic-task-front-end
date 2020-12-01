import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect as Connect } from 'react-redux';
import { Subscription, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { getChartImpression } from '@/selectors';
import { loadChartsImpressionsEntity } from '@/actions';

const subscribe = gql`
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
  };

  componentDidMount() {}

  sendSchema = async () => {};

  render() {
    return (
      <Subscription subscription={subscribe}>
        {(schema) => {
          const { data, loading, error } = schema;
          if (loading) return <div>Loading ... </div>;

          if (error) return <div>Error</div>;

          const { usersSubscribe } = data;

          if (!usersSubscribe) return <div>Error</div>;

          return usersSubscribe.map(({ id }) => <div key={id}>{id}</div>);
        }}
      </Subscription>
    );
  }
}

export default Dashboard;
