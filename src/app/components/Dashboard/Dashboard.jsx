import React, { Component } from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import { connect as Connect } from 'react-redux';
import pMinDelay from 'p-min-delay';
import { Seq, List } from 'immutable';
import { getChartImpression } from '@/selectors';
import schema from '@styles/_schema.scss';
import { loadChartsImpressionsEntity } from '@/actions';
import SkeletonLoading from '../SkeletonLoading/SkeletonLoading';
import _ from './Dashboard.scss';

const AsyncLayout = loadable((props) =>
  import(`@/components/${props.name}/${props.name}`),
);

const AsyncChart = loadable(
  (props) => import(`@/components/Charts/${props.name}/${props.name}`),
  {
    fallback: <SkeletonLoading height={100} />,
  },
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
    impressions: PropTypes.shape(),
    loadChartsImpressionsEntity: PropTypes.func,
  };

  /**
   ** Subscribe to the
   ** WebSocket via Redux Saga,
   ** all of the changes are going into
   ** over Redux Store and mutating here as well
   */

  componentDidMount() {
    this.props.loadChartsImpressionsEntity();
  }

  render() {
    const { impressions } = this.props;

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
                  <AsyncChart
                    name="CustomTinyChart"
                    type="plays"
                    data={impressions}
                    color="#3f4af1"
                  />
                </div>
                <div
                  style={{ height: '100px' }}
                  className={`${schema['col-b-6']} ${schema['col-b-md-12']} ${schema['col-b-xs-12']} ${schema['mb-2']}`}
                >
                  <AsyncChart
                    name="CustomTinyChart"
                    type="impressions"
                    color="#ef263d"
                  />
                </div>
              </div>
              <div className={schema['row-b']}>
                <div
                  style={{ height: '400px' }}
                  className={`${schema['col-b-8']} ${schema['col-b-md-12']} ${schema['col-b-xs-12']} ${schema['mb-2']}`}
                >
                  <AsyncChart
                    name="CustomEssentialChart"
                    type="impressions"
                    title="Users"
                    color={['#ef263d', '#3f4af1']}
                  />
                </div>
                <div
                  style={{ height: '400px' }}
                  className={`${schema['col-b-4']} ${schema['col-b-md-12']} ${schema['col-b-xs-12']}`}
                >
                  <AsyncChart
                    name="CustomPieChart"
                    type="multiple"
                    color={['#fff', 'black']}
                  />
                </div>
                <div className={schema['col-b-4']}></div>
                <div className={schema['col-b-4']}>
                  {/* <div>
                    <AsyncChart
                      name="CustomEssentialChart"
                      type="impressions"
                      color="#ef263d"
                    />
                  </div> */}
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
