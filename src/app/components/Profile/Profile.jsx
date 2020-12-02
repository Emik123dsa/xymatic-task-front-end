import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import schema from '@styles/_schema.scss';
import _ from './Profile.scss';

class Profile extends Component {
  render() {
    return (
      <div className={_.profile}>
        <div className={_['profile-wrapper']}>
          <section className={_['profile-wrapper_user']}>
            <div className={`${schema.row} ${schema['align-center']}`}>
              <div className={schema['col-6']}>
                <h2 className={_['profile-wrapper_user-title']}>Profile</h2>
              </div>
              <div className={`${schema['col-4']} ${schema['mr-2']} `}>
                <span className={_['profile-wrapper_edit']}></span>
              </div>
            </div>
            <div className={schema.row}>
              <div className={schema['col-12']}>
                <span className={_['profile-wrapper_user-picture']}></span>
              </div>
              <div className={schema['col-12']}>
                <span className={_['profile-wrapper_user-name']}></span>
              </div>
              <div className={schema['col-12']}>
                <span className={_['profile-wrapper_user-status']}></span>
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
