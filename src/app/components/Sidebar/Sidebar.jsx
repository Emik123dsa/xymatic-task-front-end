import React, { Component } from 'react';
import { connect as Connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import schema from '@styles/main.scss';
import Logotype from '@img/Logotype.svg';
import _ from './Sidebar.scss';
import { getSidebarActions, getSidebarFeatures } from '~/app/selectors';

@Connect(
  (state) => ({
    actions: getSidebarActions(state),
    features: getSidebarFeatures(state),
  }),
  null,
)
class Sidebar extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    features: PropTypes.object.isRequired,
  };

  componentDidMount() {}

  render() {
    const { actions, features } = this.props;

    const sideBarActions = actions.map((item) => (
      <li key={item.toString()}>
        <button type="button">{item}</button>
      </li>
    ));

    const sideBarFeatures = features.map((item) => (
      <li key={item.toString()}>
        <NavLink
          activeClassName={_['sidebar_navbar-active']}
          to={`/${item.toLowerCase()}`}
        >
          {item}
        </NavLink>
      </li>
    ));

    return (
      <div className={_.sidebar}>
        <div className={_.sidebar_wrapper}>
          <div className={_['sidebar_wrapper-logo']}>
            <Link className={_['sidebar_wrapper-logo_link']} to="/dashboard">
              <span className={_['sidebar_wrapper-logo_img']} />
            </Link>
          </div>
          <aside className={_['sidebar_wrapper-aside']}>
            <nav className={_['sidebar_wrapper-navbar']}>
              <ul className={_['sidebar_navbar-list-features']}>
                {sideBarFeatures}
              </ul>
              <ul className={_['sidebar_navbar-list-actions']}>
                {sideBarActions}
              </ul>
            </nav>
          </aside>
        </div>
      </div>
    );
  }
}

export default Sidebar;
