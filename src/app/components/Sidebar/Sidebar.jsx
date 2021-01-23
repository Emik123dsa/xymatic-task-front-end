import React, { Component, Fragment } from 'react';
import { connect as Connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { distinctUntilChanged, Subscription, tap } from 'rxjs/operators';
import { BehaviorSubject, fromEvent, ReplaySubject } from 'rxjs';
import loadable from '@loadable/component';
import _ from './Sidebar.scss';
import { getSidebarActions, getSidebarFeatures } from '~/app/selectors';
import { classnames } from '~/app/shared/coercedClassnames';
import { setModalCurrentClientSchema } from '~/app/actions';

@Connect(
  (state) => ({
    actions: getSidebarActions(state),
    features: getSidebarFeatures(state),
  }),
  {
    setModalCurrentClientSchema,
  },
)
class Sidebar extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    features: PropTypes.object.isRequired,
    setModalCurrentClientSchema: PropTypes.func.isRequired,
  };

  _actionSubject = new ReplaySubject(1);

  _actionSubsciption = this._actionSubject.asObservable();

  componentDidMount() {
    setTimeout(() => {
      this._actionSubsciption.subscribe((item) =>
        this.props.setModalCurrentClientSchema(item),
      );
    }, 0);
  }

  componentWillUnmount() {
    if (this._actionSubject) {
      this._actionSubject.unsubscribe();
      this._actionSubject = null;
    }
  }

  render() {
    const { actions, features } = this.props;
    const sideBarActions = actions.map((item) => (
      <li key={item.toString()}>
        <button onClick={() => this._actionSubject.next(item)} type="button">
          {item}
          <span className={_['sidebar_navbar-link-bg']}></span>
          <span
            className={classnames(
              _[`sidebar_navbar-link_${item.toLowerCase()}`],
              _['sidebar_navbar-link'],
            )}
          ></span>
        </button>
      </li>
    ));

    const sideBarFeatures = features.map((item) => (
      <li key={item.toString()}>
        <NavLink
          activeClassName={_['sidebar_navbar-active']}
          to={`/${item.toLowerCase()}`}
        >
          {item}
          <span className={_['sidebar_navbar-link-bg']}></span>
          <span
            className={classnames(
              _[`sidebar_navbar-link_${item.toLowerCase()}`],
              _['sidebar_navbar-link'],
            )}
          ></span>
        </NavLink>
      </li>
    ));

    return (
      <div className={_.sidebar}>
        <div className={_.sidebar_wrapper}>
          <div className={_['sidebar_wrapper-app']}>
            <Link className={_['sidebar_wrapper-app-link']} to="/dashboard">
              <span className={_['sidebar_wrapper-app-logotype']}> </span>
              <h4>
                Task&nbsp;
                <span>App</span>
              </h4>
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
