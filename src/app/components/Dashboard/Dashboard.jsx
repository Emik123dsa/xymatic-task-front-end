/* eslint-disable import/order */
import React, { Component, Fragment } from 'react';
import { chartConfig } from '~/chartConfig';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import { connect as Connect } from 'react-redux';
import {
  getChartImpression,
  getChartPlays,
  getChartPosts,
  getChartsEntity,
  getChartUsers,
  Period,
} from '@/selectors';
import schema from '@styles/_schema.scss';
import {
  loadChartsImpressionsEntity,
  loadChartsPlaysEntity,
  loadChartsPostsEntity,
  loadChartsUsersEntity,
} from '@/actions';

import SkeletonLoading from '../SkeletonLoading/SkeletonLoading';
import _ from './Dashboard.scss';
import { classnames } from '~/app/shared/coercedClassnames';
import { isNull } from 'lodash';

const AsyncLayout = loadable((props) =>
  import(`@/components/${props?.name}/${props?.name}`),
);

const AsyncTinyChart = loadable(
  () => import('@/components/Charts/CustomTinyChart/CustomTinyChart'),
  {
    fallback: <SkeletonLoading height={chartConfig.tinyHeight} />,
  },
);

const AsyncEssentialChart = loadable(
  () => import('@/components/Charts/CustomEssentialChart/CustomEssentialChart'),
  {
    fallback: <SkeletonLoading height={chartConfig.essentialHeight} />,
  },
);

const AsyncPieChart = loadable(
  () => import('@/components/Charts/CustomPieChart/CustomPieChart'),
  {
    fallback: <SkeletonLoading height={chartConfig.essentialHeight} />,
  },
);

@Connect(
  (state) => ({
    charts: getChartsEntity(state),
    users: getChartUsers(state),
    posts: getChartPosts(state),
    plays: getChartPlays(state),
    impressions: getChartImpression(state),
  }),
  {
    loadChartsUsersEntity,
    loadChartsPostsEntity,
    loadChartsPlaysEntity,
    loadChartsImpressionsEntity,
  },
)
class Dashboard extends Component {
  static propTypes = {
    charts: PropTypes.object,

    users: PropTypes.object,
    posts: PropTypes.object,
    plays: PropTypes.object,
    impressions: PropTypes.object,

    loadChartsUsersEntity: PropTypes.func,
    loadChartsPostsEntity: PropTypes.func,
    loadChartsPlaysEntity: PropTypes.func,
    loadChartsImpressionsEntity: PropTypes.func,
  };

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
        if (callback instanceof Function) callback(Period.AllTime);
      });
    } catch (e) {
      console.error('[GraphQL]: Init Error');
    }
  }

  componentWillUnmount() {
    const { charts } = this.props;
    charts.valueSeq().forEach((item) => {
      if (!isNull(item.get('EVENT_CHANNEL'))) item.get('EVENT_CHANNEL').close();
    });
  }

  render() {
    const { charts, users, impressions, posts, plays } = this.props;

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
                  className={classnames(
                    schema['col-b-6'],
                    schema['col-b-md-6'],
                    schema['col-b-xs-12'],
                    schema['mb-2'],
                  )}
                >
                  <AsyncTinyChart type="plays" data={plays} color="#3f4af1" />
                </div>
                <div
                  style={{ height: '100px' }}
                  className={classnames(
                    schema['col-b-6'],
                    schema['col-b-md-6'],
                    schema['col-b-xs-12'],
                    schema['mb-2'],
                  )}
                >
                  <AsyncTinyChart
                    type="impressions"
                    data={impressions}
                    color="#ef263d"
                  />
                </div>
              </div>
              <div className={schema['row-b']}>
                <div
                  style={{ height: '400px' }}
                  className={classnames(
                    schema['col-b-8'],
                    schema['col-b-md-12'],
                    schema['col-b-xs-12'],
                    schema['mb-2'],
                  )}
                >
                  <AsyncEssentialChart
                    type="activity"
                    title="Activity"
                    height={chartConfig.essentialHeight}
                    content={[
                      {
                        type: 'Posts',
                        data: posts,
                        color: '#3f4af1',
                      },
                      {
                        type: 'Users',
                        data: users,
                        color: '#ef263d',
                      },
                    ]}
                  />
                </div>
                <div
                  style={{ height: '400px' }}
                  className={classnames(
                    schema['col-b-4'],
                    schema['col-b-md-12'],
                    schema['col-b-xs-12'],
                  )}
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
