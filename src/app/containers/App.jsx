import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect as Connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { getRouterLocation, getRouter } from '@/selectors';

@Connect(
  (state) => ({
    location: getRouterLocation(state),
  }),
  null,
)
class App extends Component {
  static propTypes = {
    location: PropTypes.shape().isRequired,
    route: PropTypes.shape().isRequired,
  };

  _title = 'XYMATIC Dashboard';

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
    const { route } = this.props;
    return (
      <div>
        {this._renderSiteMeta()}
        <main>{renderRoutes(route.routes)}</main>
      </div>
    );
  }
}

export default App;
