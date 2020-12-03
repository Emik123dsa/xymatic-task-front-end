import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import schema from '@styles/_schema.scss';
import _ from './Header.scss';

class Header extends Component {
  render() {
    return (
      <header className={_.header}>
        <div className={_['header-wrapper']}>
          <div className={schema.row}>
            <div className={schema['col-6']}>
              <h2 className={_['header-wrapper_analytics-title']}>
                Analytics overview
              </h2>
            </div>
            <div className={schema['col-6']}>
              <input type="text" />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
