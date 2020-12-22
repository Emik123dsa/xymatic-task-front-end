import React, { Component, Fragment } from 'react';
import loadable from '@loadable/component';
import { connect as Connect } from 'react-redux';
import schema from '@styles/main.scss';
import { fadeInDown } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { getRouterLocation } from '../selectors';

const AsyncAuthComponent = loadable((props) =>
  import(`~/app/components/Auth/${props.tag}/${props.tag}`),
);

const styles = StyleSheet.create({
  fadeInDown: {
    animationName: fadeInDown,
    animationDuration: '0.4s',
  },
});

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

  static credentials = {
    title: 'Hello, Friend!',
    description: 'Enter your details and start journey with us',
    buttonTitle: 'Sign Up',
    buttonTo: '/signup',
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
        {this._renderSiteMeta()}
        <div className={css(styles.fadeInDown)}>
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
