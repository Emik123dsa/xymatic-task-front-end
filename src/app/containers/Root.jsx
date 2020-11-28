import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect as Connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { getRouterLocation } from '@/selectors';
import { dynamicRoutes } from '../routes';

/**
 * Decorators instead of mapStateToProps | mapDispatchToProps
 */
@Connect(
  (state) => ({
    location: getRouterLocation(state),
  }),
  null,
)
class Root extends Component {
  static propTypes = {
    location: PropTypes.shape().isRequired,
    route: PropTypes.shape().isRequired,
  };

  _title = 'Xymatic';

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
      <div className="root">
        {this._renderSiteMeta()}
        <div className="main">{renderRoutes(route.childRoutes)}</div>
      </div>
    );
  }
}

export default Root;
