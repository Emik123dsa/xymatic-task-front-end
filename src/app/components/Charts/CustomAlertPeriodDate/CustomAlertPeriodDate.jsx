/* eslint-disable  no-return-assign */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect as Connect } from 'react-redux';
import { List } from 'immutable';
import {
  setModalCurrentDateSchema,
  setModalIsOpened,
  cancelChartsUsersEntity,
} from '~/app/actions';
import {
  getModalCurrentDateSchema,
  getModalDateSchema,
  getModalOpenedState,
} from '~/app/selectors';
import { ClickOutside } from '~/app/shared/ClickOutside/ClickOutside';

import _ from './CustomAlertPeriodDate.scss';

const customAlertButtonRadius = [
  {
    borderBottomRightRadius: '1rem',
    borderBottomLeftRadius: '1rem',
  },
  {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottom: '0.1rem solid transparent',
  },
];

@Connect(
  (state) => ({
    isOpenedState: getModalOpenedState(state),
    dateSchema: getModalDateSchema(state),
    currentDateSchema: getModalCurrentDateSchema(state),
  }),
  {
    cancelChartsUsersEntity,
    setModalCurrentDateSchema,
    setModalIsOpened,
  },
)
export class CustomAlertPeriodDate extends PureComponent {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
    this._setCurrentDateSchema = this._setCurrentDateSchema.bind(this);
  }

  static propTypes = {
    setModalIsOpened: PropTypes.func,
    setModalCurrentDateSchema: PropTypes.func,
    cancelChartsUsersEntity: PropTypes.func,
    currentDateSchema: PropTypes.object,
    isOpenedState: PropTypes.bool,
    dateSchema: PropTypes.object,
  };

  _handleClick(payload) {
    this.props.setModalIsOpened({ payload });
  }

  _setCurrentDateSchema({ currentSchema }) {
    this.props.setModalIsOpened({ payload: false });
    this.props.setModalCurrentDateSchema({ payload: currentSchema });
  }

  _renderModalDateSchema() {
    if (this.props.isOpenedState) {
      return (
        <div className={_['custom-alter-period-date_credentials']}>
          <aside className={_['custom-alter-period-date_credentials_wrapper']}>
            <nav className={_['custom-alter-period-date_credentials_navbar']}>
              <ul className={_['custom-alter-period-date_credentials_list']}>
                {List(this.props.dateSchema).map((item, index) => (
                  <li
                    onClick={() =>
                      this._setCurrentDateSchema({
                        currentSchema: item.get(0),
                      })
                    }
                    key={index}
                  >
                    <span>{item.get('0')}</span>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      );
    }

    return null;
  }

  render() {
    return (
      <div className={_['custom-alter-period']}>
        <ClickOutside
          currentState={this.props.isOpenedState}
          emitOnClick={this._handleClick}
        >
          <button
            style={
              this.props.isOpenedState
                ? customAlertButtonRadius[1]
                : customAlertButtonRadius[0]
            }
            className={_['custom-alter-period-date']}
            type="submit"
          >
            {this.props.currentDateSchema.get(0)}
            <span
              style={{
                transform: `rotate(${this.props.isOpenedState ? 180 : 0}deg)`,
              }}
              className={_['custom-alter-period-date_dropdown']}
            ></span>
          </button>
          {this._renderModalDateSchema()}
        </ClickOutside>
      </div>
    );
  }
}
