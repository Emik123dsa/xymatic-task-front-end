import React, { Component } from 'react';
import { connect as Connect } from 'react-redux';
import PropTypes from 'prop-types';
import schema from '@styles/_schema.scss';
import _ from './Profile.scss';
import { getUserCredentials } from '~/app/selectors';

@Connect(
  (state) => ({
    userCredentials: getUserCredentials(state),
  }),
  null,
)
class Profile extends Component {
  static propTypes = {
    userCredentials: PropTypes.object.isRequired,
  };

  get _userAuthority() {
    const { userCredentials } = this.props;
    if (userCredentials.has('roles')) {
      const roles = userCredentials.get('roles').valueSeq().first().toString();
      return `${roles.charAt(0).toUpperCase()}${roles.slice(1).toLowerCase()}`;
    }
    return null;
  }

  render() {
    const { userCredentials } = this.props;

    return (
      <div className={_.profile}>
        <div className={_['profile-wrapper']}>
          <section className={_['profile-wrapper_user']}>
            <div
              className={`${schema.row} ${schema['align-center']} ${schema['justify-content-between']} ${schema['mb-3']}`}
            >
              <div className={schema['col-b-6']}>
                <h2 className={_['profile-wrapper_user-title']}>Profile</h2>
              </div>
              <div className={schema['col-b-4']}>
                <span className={_['profile-wrapper_edit']}></span>
              </div>
            </div>
            <div
              className={[schema.row, schema['justify-content-center']]
                .filter((e) => !!e)
                .join(' ')}
            >
              <div className={schema['col-b-12']}>
                <span className={_['profile-wrapper_user-picture']}></span>
              </div>
              <div
                style={{ marginTop: '1.5rem' }}
                className={schema['col-b-12']}
              >
                <span className={_['profile-wrapper_user-name']}>
                  {userCredentials.get('name')}
                </span>
              </div>
              <div
                style={{ marginTop: '0.3rem' }}
                className={schema['col-b-12']}
              >
                <span className={_['profile-wrapper_user-status']}>
                  {this._userAuthority}
                </span>
              </div>
            </div>
          </section>
          <section className={_['profile-wrapper_notification']}></section>
          <section className={_['profile-wrapper_recent-actions']}></section>
        </div>
      </div>
    );
  }
}

export default Profile;
