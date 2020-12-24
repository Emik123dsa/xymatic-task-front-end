import React, { Component, Fragment } from 'react';
import loadable from '@loadable/component';
import { connect as Connect } from 'react-redux';
import schema from '@styles/main.scss';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { coercedStyles } from '@/shared/coercedStyles';
import { setErrorMessage, resetErrorMessage } from '@/actions';

import {
  getUserAuthenticated,
  getRouterLocation,
  getErrors,
} from '~/app/selectors';

const AsyncAuthComponent = loadable((props) =>
  import(`~/app/components/Auth/${props.tag}/${props.tag}`),
);

@Connect(
  (state) => ({
    location: getRouterLocation(state),
    isAuthenticated: getUserAuthenticated(state),
    errors: getErrors(state),
  }),
  { resetErrorMessage },
)
class Auth extends Component {
  _title = 'Xymatic | Auth';

  static propTypes = {
    location: PropTypes.shape().isRequired,
    route: PropTypes.shape().isRequired,
    errors: PropTypes.shape(),
    resetErrorMessage: PropTypes.func,
  };

  static credentials = {
    title: 'Hello, Friend!',
    description: 'Enter your details and start journey with us',
    buttonTitle: 'Sign Up',
    buttonTo: '/signup',
  };

  componentWillUnmount() {
    this.props.resetErrorMessage();
  }

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
    const { errors } = this.props;
    return (
      <Fragment>
        {this._renderSiteMeta()}
        <div className={coercedStyles(errors)}>
          <div className={schema.auth}>
            <div className={schema.container}>
              <div className={schema['auth-wrapper']}>
                <div
                  className={`${schema.row} ${schema['justify-content-center']} ${schema['mt-5']}`}
                >
                  <div
                    className={[
                      schema['col-4'],
                      schema['col-md-6'],
                      schema['col-xs-12'],
                    ]
                      .filter((e) => !!e)
                      .join(' ')}
                  >
                    <AsyncAuthComponent tag="LoginBoard" />
                  </div>
                  <div
                    className={[
                      schema['col-4'],
                      schema['col-md-6'],
                      schema['col-xs-12'],
                    ]
                      .filter((e) => !!e)
                      .join(' ')}
                  >
                    <AsyncAuthComponent
                      tag="AdditionalBoard"
                      credentials={Auth.credentials}
                    />
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

export default Auth;
