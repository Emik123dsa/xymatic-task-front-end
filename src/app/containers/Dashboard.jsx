import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect as Connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import loadable from '@loadable/component';
import { getRouterLocation } from '@/selectors';
import schema from '@styles/main.scss';

const AsyncComponent = loadable((props) =>
  import(`@/components/${props.name}/${props.name}`),
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
      <div className={schema.dashboard}>
        <div className={schema.container}>
          {this._renderSiteMeta()}
          <div className={schema.row}>
            <div className={schema['col-2']}>
              <AsyncComponent name="Sidebar" />
            </div>
            <div className={schema['col-7']}>
              <header className={schema.header}></header>
              <main className={schema.dashboard}>
                <section className={schema.dashboard_wrapper}>
                  <AsyncComponent name="Dashboard" />
                </section>
              </main>
              <footer></footer>
            </div>
            <div className={schema['col-3']}>
              <div className={schema['dashboard_profile-wrapper']}>
                <AsyncComponent name="Profile" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;