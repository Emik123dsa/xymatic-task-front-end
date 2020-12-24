import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect as Connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { getRouterLocation, getUser } from '@/selectors';
import { Redirect } from 'react-router';

@Connect(
  (state) => ({
    location: getRouterLocation(state),
    user: getUser(state),
  }),
  null,
)
class App extends Component {
  static propTypes = {
    location: PropTypes.shape().isRequired,
    route: PropTypes.shape().isRequired,
    user: PropTypes.shape().isRequired,
  };

  _title = 'Xymatic | Init';

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
      <Redirect
        to={{
          pathname: route.redirect,
          state: { from: this.props.location.toJS() },
        }}
      ></Redirect>
    );
  }
}

export default App;
