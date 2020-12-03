import React, { Component } from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import { connect as Connect } from 'react-redux';
import { Subscription, Query } from 'react-apollo';
import { createClient } from 'graphql-ws';
import { Seq, List } from 'immutable';
import { getChartImpression } from '@/selectors';
import schema from '@styles/_schema.scss';
import { loadChartsImpressionsEntity } from '@/actions';

import _ from './Dashboard.scss';

const AsyncComponent = loadable((props) =>
  import(`@/components/${props.name}/${props.name}`),
);

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
    // impressions: PropTypes.shape(),
    // loadChartsImpressionsEntity: PropTypes.func,
  };

  /**
   ** Subscribe to the
   ** WebSocket via Redux Saga,
   ** all of the changes are going into
   ** over Redux Store and mutating here as well
   */

  componentDidMount() {
    // this.props.loadChartsImpressionsEntity();
  }

  render() {
    // const { impressions } = this.props;

    // const _subscriber = !impressions.has('usersSubscribe') ? (
    //   <div>Loading ...</div>
    // ) : (
    //   List(impressions.get('usersSubscribe')).map((item) => (
    //     <li key={item.get('id')}>{item.get('id')}</li>
    //   ))
    // );

    return (
      <section className={_['dashboard-section_charts']}>
        <div className={schema['dashboard-wrapper']}>
          <span className={_['dashboard-section_restrictor-top']}></span>
          <div className={_['dashboard-section_charts-observer']}>
            <div className={_['dashboard-section_restrictor-top-stripe']}></div>
            <div className={_['dashboard-section_charts-wrapper']}>
              <AsyncComponent name="Header" />
              <div className={schema['row-b']}>
                <div className={schema['col-b-6']}>Plays</div>
                <div className={schema['col-b-6']}>Impressions</div>
              </div>
              <div className={schema['row-b']}>
                <div className={schema['col-b-8']}>Plays</div>
                <div className={schema['col-b-4']}>Impressions</div>
              </div>
              <div className={schema['row-b']}>
                <div className={schema['col-b-12']}>Actions</div>
              </div>
              <AsyncComponent name="Footer" />
            </div>
            <div
              className={_['dashboard-section_restrictor-bottom-stripe']}
            ></div>
          </div>
          <span className={_['dashboard-section_restrictor-bottom']}></span>
        </div>
      </section>
    );
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
