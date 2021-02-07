/* eslint-disable import/order */
import React, { Component, Fragment } from 'react';
import { chartConfig } from '~/chart.config';
import PropTypes from 'prop-types';
import { connect as Connect } from 'react-redux';
import {
  getChartImpression,
  getChartPlays,
  getChartPosts,
  getChartRowsAmount,
  getChartsEntity,
  getChartUsers,
  Period,
} from '@/selectors';
import schema from '@styles/_schema.scss';

import _ from './Dashboard.scss';
import { classnames } from '@/shared/coerced.classnames';
import { hot } from 'react-hot-loader/root';

import {
  AsyncTemplate,
  AsyncEssentialChart,
  AsyncPieChart,
  AsyncTinyChart,
  AsyncLayout,
} from '@/shared/coerced.actions';

@hot
@Connect(
  (state) => ({
    charts: getChartsEntity(state),
    users: getChartUsers(state),
    posts: getChartPosts(state),
    plays: getChartPlays(state),
    impressions: getChartImpression(state),
    rows: getChartRowsAmount(state),
  }),
  null,
)
class Dashboard extends Component {
  static propTypes = {
    charts: PropTypes.object,

    users: PropTypes.object,
    posts: PropTypes.object,
    plays: PropTypes.object,
    impressions: PropTypes.object,
    rows: PropTypes.object,
  };

  render() {
    const { users, impressions, posts, plays, rows } = this.props;

    return (
      <section className={_['dashboard-section_charts']}>
        <div className={schema['dashboard-wrapper']}>
          <div className={_['dashboard-section_charts-wrapper']}>
            <div
              className={classnames(
                schema['row-b'],
                schema['hidden-x'],
                schema['py-1'],
              )}
            >
              <div
                style={{ minHeight: chartConfig.tinyHeight }}
                className={classnames(
                  schema['col-b-6'],
                  schema['col-b-md-6'],
                  schema['col-b-xs-12'],
                )}
              >
                <AsyncTinyChart
                  direction="left"
                  height={chartConfig.tinyHeight}
                  type="plays"
                  data={plays}
                  color="#3f4af1"
                />
              </div>
              <div
                style={{ minHeight: chartConfig.tinyHeight }}
                className={classnames(
                  schema['col-b-6'],
                  schema['col-b-md-6'],
                  schema['col-b-xs-12'],
                )}
              >
                <AsyncTinyChart
                  direction="right"
                  height={chartConfig.tinyHeight}
                  type="impressions"
                  data={impressions}
                  color="#ef263d"
                />
              </div>
            </div>
            <div
              className={classnames(
                schema['row-b'],
                schema['hidden-x'],
                schema['py-1'],
              )}
            >
              <div
                style={{ minHeight: chartConfig.essentialHeight }}
                className={classnames(
                  schema['col-b-8'],
                  schema['col-b-md-12'],
                  schema['col-b-xs-12'],
                )}
              >
                <AsyncEssentialChart
                  type="activity"
                  title="Activity"
                  direction="left"
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
                style={{ minHeight: chartConfig.essentialHeight }}
                className={classnames(
                  schema['col-b-4'],
                  schema['col-b-md-12'],
                  schema['col-b-xs-12'],
                )}
              >
                <AsyncPieChart
                  type="multiple"
                  direction="right"
                  colors={['#602dd3', '#3f4af1', '#ef263d', '#eee', '#f39c12']}
                  data={rows}
                />
              </div>
            </div>
            <div
              style={{ minHeight: chartConfig.actionsHeight }}
              className={classnames(
                schema['row-b'],
                schema['py-1'],
                schema.hidden,
              )}
            >
              <div className={schema['col-b-12']}>
                <AsyncTemplate name="TemplatePost" page={0} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Dashboard;
