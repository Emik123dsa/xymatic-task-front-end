import React, { Component } from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import { connect as Connect } from 'react-redux';
import pMinDelay from 'p-min-delay';
import { Seq, List } from 'immutable';
import { getChartImpression, getChartUsers, Period } from '@/selectors';
import schema from '@styles/_schema.scss';
import { loadChartsImpressionsEntity, loadChartsUsersEntity } from '@/actions';
import SkeletonLoading from '../SkeletonLoading/SkeletonLoading';
import _ from './Dashboard.scss';

const HEIGHT_TINY_CHART_DEFAULT = 100;

const HEIGHT_ESSENTIAL_CHART_DEFAULT = 400;

const AsyncLayout = loadable((props) =>
  import(`@/components/${props.name}/${props.name}`),
);

const AsyncTinyChart = loadable(
  () => import('@/components/Charts/CustomTinyChart/CustomTinyChart'),
  {
    fallback: <SkeletonLoading height={HEIGHT_TINY_CHART_DEFAULT} />,
  },
);

const AsyncEssentialChart = loadable(
  () => import('@/components/Charts/CustomEssentialChart/CustomEssentialChart'),
  {
    fallback: <SkeletonLoading height={HEIGHT_ESSENTIAL_CHART_DEFAULT} />,
  },
);

const AsyncPieChart = loadable(
  () => import('@/components/Charts/CustomPieChart/CustomPieChart'),
  {
    fallback: <SkeletonLoading height={HEIGHT_ESSENTIAL_CHART_DEFAULT} />,
  },
);

@Connect(
  (state) => ({
    users: getChartUsers(state),
    impressions: getChartImpression(state),
  }),
  {
    loadChartsUsersEntity,
    loadChartsImpressionsEntity,
  },
)
class Dashboard extends Component {
  static propTypes = {
    // impressions: PropTypes.array,
    users: PropTypes.object,
    loadChartsUsersEntity: PropTypes.func,
    loadChartsImpressionsEntity: PropTypes.func,
  };

  /**
   ** Subscribe to the
   ** WebSocket via Redux Saga,
   ** all of the changes are going into
   ** over Redux Store and mutating here as well
   */

  componentDidMount() {
    //   //this.props.loadChartsUsersEntity({ payload: Period.RealTime });
  }

  render() {
    const { users } = this.props;

    return (
      <section className={_['dashboard-section_charts']}>
        <div className={schema['dashboard-wrapper']}>
          <span className={_['dashboard-section_restrictor-top']}></span>
          <div className={_['dashboard-section_charts-observer']}>
            <div className={_['dashboard-section_restrictor-top-stripe']}></div>
            <div className={_['dashboard-section_charts-wrapper']}>
              <AsyncLayout name="Header" />
              <div className={schema['row-b']}>
                <div
                  style={{ height: '100px' }}
                  className={`${schema['col-b-6']} ${schema['col-b-md-12']} ${schema['col-b-xs-12']} ${schema['mb-2']}`}
                >
                  <AsyncTinyChart type="plays" color="#3f4af1" />
                </div>
                <div
                  style={{ height: '100px' }}
                  className={`${schema['col-b-6']} ${schema['col-b-md-12']} ${schema['col-b-xs-12']} ${schema['mb-2']}`}
                >
                  <AsyncTinyChart type="impressions" color="#ef263d" />
                </div>
              </div>
              <div className={schema['row-b']}>
                <div
                  style={{ height: '400px' }}
                  className={`${schema['col-b-8']} ${schema['col-b-md-12']} ${schema['col-b-xs-12']} ${schema['mb-2']}`}
                >
                  <AsyncEssentialChart
                    type="activity"
                    title="Activity"
                    height={400}
                    content={[
                      {
                        type: 'Users',
                        data: users,
                        color: '#ef263d',
                      },
                      {
                        type: 'Posts',
                        color: '#3f4af1',
                      },
                    ]}
                  />
                </div>
                <div
                  style={{ height: '400px' }}
                  className={`${schema['col-b-4']} ${schema['col-b-md-12']} ${schema['col-b-xs-12']}`}
                >
                  <AsyncPieChart type="multiple" color={['#fff', 'black']} />
                </div>
              </div>
              <div className={schema['row-b']}>
                <div className={schema['col-b-12']}>Actions</div>
              </div>
              <AsyncLayout name="Footer" />
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
