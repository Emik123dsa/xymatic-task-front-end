import React, { Component, Fragment } from 'react';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { connect as Connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import loadable from '@loadable/component';
import { getRouterLocation } from '@/selectors';
import schema from '@styles/main.scss';
import { css } from 'aphrodite';
import { styles } from '@/shared/coerced.styles';
import pMinDelay from 'p-min-delay';
import LazyLoading from '@/components/LazyLoading/LazyLoading';
import { Switch, withRouter } from 'react-router';
import { Route2 } from '@/routes/route2';
import {
  AsyncAuthModal,
  AsyncChartModal,
  AsyncComponent,
  AsyncLayout,
} from '@/shared/coerced.actions';
import { loadChartRowsAmountEntity } from '@/actions';
import { classnames } from '@/shared/coerced.classnames';

@withRouter
@Connect(
  (state) => ({
    location: getRouterLocation(state),
  }),
  {
    loadChartRowsAmountEntity,
  },
)
class Dashboard extends Component {
  static propTypes = {
    location: PropTypes.shape().isRequired,
    route: PropTypes.shape().isRequired,
    loadChartRowsAmountEntity: PropTypes.func,
  };

  _title = 'Xymatic | Dashboard';

  componentDidMount() {
    this.props.loadChartRowsAmountEntity();
  }

  _renderSiteMeta() {
    const canonical = this.props.location.get('pathname').toLowerCase();
    return (
      <Helmet
        link={[
          {
            href: canonical,
            rel: 'canonical',
          },
        ]}
        title={this._title}
      />
    );
  }

  render() {
    const { route } = this.props;

    return (
      <Fragment>
        {this._renderSiteMeta()}
        <AsyncAuthModal name="LogOutModal" />
        <AsyncAuthModal name="SettingsModal" />
        <AsyncChartModal name="ManualModal" />
        <div className={schema.dashboard}>
          <div className={schema['dashboard-wrapper']}>
            <div
              className={classnames(
                schema.row,
                schema['justify-content-center'],
              )}
            >
              <div
                className={classnames(
                  schema['col-2'],
                  schema['col-md-6'],
                  schema['col-xs-12'],
                )}
              >
                <AsyncComponent name="Sidebar" />
              </div>
              <div
                className={classnames(
                  schema['col-8'],
                  schema['col-md-12'],
                  schema['col-xs-12'],
                )}
              >
                <div className={classnames(schema['row-b'], schema['px-2'])}>
                  <div className={schema['col-b-12']}>
                    <AsyncLayout name="Header" />
                  </div>
                </div>
                <main className={schema['dashboard_main-wrapper']}>
                  <Switch>
                    {route.routes.map((_route, index) => (
                      <Route2 key={index} {..._route} />
                    ))}
                  </Switch>
                </main>
              </div>
              <div
                className={classnames(
                  schema['col-2'],
                  schema['col-md-6'],
                  schema['col-xs-12'],
                )}
              >
                <div className={schema['dashboard_profile-wrapper']}>
                  <AsyncComponent name="Profile" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Dashboard;
