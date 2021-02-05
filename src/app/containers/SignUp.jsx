import React, { Component, Fragment } from 'react';
import loadable from '@loadable/component';
import { connect as Connect } from 'react-redux';
import schema from '@styles/main.scss';
import PropTypes from 'prop-types';
import { fadeInDown } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';
import { Helmet } from 'react-helmet';
import {
  getErrors,
  getRouterLocation,
  getUserAuthenticated,
} from '@/selectors';
import { resetErrorMessage } from '@/actions';
import { coercedStyles } from '@/shared/coerced.styles';

const AsyncAuthComponent = loadable((props) =>
  import(`@/components/Auth/${props.tag}/${props.tag}`),
);

@Connect(
  (state) => ({
    location: getRouterLocation(state),
    isAuthenticated: getUserAuthenticated(state),
    errors: getErrors(state),
  }),
  { resetErrorMessage },
)
class SignUp extends Component {
  _title = 'Xymatic | Sign Up';

  static propTypes = {
    location: PropTypes.shape().isRequired,
    route: PropTypes.shape().isRequired,
    isAuthenticated: PropTypes.bool,
    resetErrorMessage: PropTypes.func,
    errors: PropTypes.object,
  };

  componentWillUnmount() {
    this.props.resetErrorMessage();
  }

  static credentials = {
    title: 'Join our team!',
    description:
      'Are you having an account already? Click in the button below to sign in!',
    buttonTitle: 'Sign In',
    buttonTo: '/auth',
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
                    <AsyncAuthComponent tag="SignUpBoard" />
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
                      credentials={SignUp.credentials}
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

export default SignUp;
