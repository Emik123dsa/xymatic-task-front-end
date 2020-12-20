import React, { Component, Fragment } from 'react';
import loadable from '@loadable/component';
import { connect as Connect } from 'react-redux';
import schema from '@styles/main.scss';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { getRouterLocation } from '../selectors';

const AuthComponent = loadable(() =>
  import('@/components/AuthBoard/AuthBoard'),
);

@Connect(
  (state) => ({
    location: getRouterLocation(state),
  }),
  null,
)
class Auth extends Component {
  componentDidMount() {}

  _title = 'Xymatic | Auth';

  static propTypes = {
    location: PropTypes.shape().isRequired,
    route: PropTypes.shape().isRequired,
  };

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
        <div className={schema.auth}>
          <div className={schema.container}>
            {this._renderSiteMeta()}
            <div className={schema['auth-wrapper']}>
              <div
                className={`${schema['row-b']} ${schema['justify-content-center']}`}
              >
                <div
                  className={[
                    schema['col-b-4'],
                    schema['col-md-6'],
                    schema['col-xs-12'],
                  ]
                    .filter((e) => !!e)
                    .join(' ')}
                >
                  <AuthComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Auth;
