import React, { Component, Fragment } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect as Connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import loadable from '@loadable/component';
import { getRouterLocation } from '@/selectors';
import schema from '@styles/main.scss';
import { css } from 'aphrodite';
import { styles } from '@/shared/coercedStyles';
import LazyLoading from '@/components/LazyLoading/LazyLoading';

const AsyncComponent = loadable((props) =>
  import(`@/components/${props.name}/${props.name}`),
);

const AsyncAuthModal = loadable(
  (props) => import(`@/components/Auth/${props?.name}/${props?.name}`),
  {
    fallback: <LazyLoading />,
  },
);

const AsyncChartModal = loadable(
  (props) => import(`@/components/Charts/${props?.name}/${props?.name}`),
  {
    fallback: <LazyLoading />,
  },
);

@Connect(
  (state) => ({
    location: getRouterLocation(state),
  }),
  null,
)
class Dashboard extends Component {
  static propTypes = {
    location: PropTypes.shape().isRequired,
    route: PropTypes.shape().isRequired,
  };

  _title = 'Xymatic | Dashboard';

  _renderSiteMeta() {
    const canonical = this.props.location.toJS().pathname.toLowerCase();
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
    return (
      <Fragment>
        <AsyncAuthModal name="LogOutModal" />
        <AsyncAuthModal name="SettingsModal" />
        <AsyncChartModal name="ManualModal" />
        <div className={css(styles.fadeInDown)}>
          <div className={schema.dashboard}>
            <div className={schema.container}>
              {this._renderSiteMeta()}
              <div className={schema['dashboard-wrapper']}>
                <div
                  className={`${schema.row} ${schema['justify-content-center']}`}
                >
                  <div
                    className={`${schema['col-2']} ${schema['col-md-6']} ${schema['col-xs-12']} `}
                  >
                    <AsyncComponent name="Sidebar" />
                  </div>
                  <div
                    className={`${schema['col-7']} ${schema['col-md-12']} ${schema['col-xs-12']} `}
                  >
                    <main className={schema['dashboard_main-wrapper']}>
                      <AsyncComponent name="Dashboard" />
                    </main>
                  </div>
                  <div
                    className={`${schema['col-3']} ${schema['col-md-6']} ${schema['col-xs-12']}`}
                  >
                    <div className={schema['dashboard_profile-wrapper']}>
                      <AsyncComponent name="Profile" />
                    </div>
                  </div>
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
