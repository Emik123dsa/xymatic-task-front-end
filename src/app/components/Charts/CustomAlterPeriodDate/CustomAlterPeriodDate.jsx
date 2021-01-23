/* eslint-disable  no-return-assign */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect as Connect } from 'react-redux';
import { List, Map } from 'immutable';
import { CSSTransition } from 'react-transition-group';
import { getChartCurrentDate, getModalDateSchema, Period } from '@/selectors';
import { ClickOutside } from '@/shared/clickOutside/ClickOutside';
import { setModalCurrentDateSchema } from '@/actions';
import _ from './CustomAlterPeriodDate.scss';

import '@styles/animations.css';

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
    dateSchema: getModalDateSchema(state),
    currentDateSchema: getChartCurrentDate(state),
  }),
  {
    setModalCurrentDateSchema,
  },
)
export class CustomAlterPeriodDate extends PureComponent {
  constructor(props) {
    super(props);
    this._setCurrentDateSchema = this._setCurrentDateSchema.bind(this);
    this.state = {
      isOpenedState: false,
    };
  }

  static propTypes = {
    setModalCurrentDateSchema: PropTypes.func,
    currentDateSchema: PropTypes.object,
    dateSchema: PropTypes.object,
    types: PropTypes.array,
  };

  get _currentDate() {
    const { currentDateSchema, types } = this.props;

    try {
      if (!Array.isArray(types)) throw new ReferenceError(types);

      if (
        !Array.prototype.every.call(
          types,
          (item) => !!Map(currentDateSchema).getIn([item.toLowerCase()]),
        )
      ) {
        throw new RangeError(types);
      }
    } catch (e) {
      return e instanceof ReferenceError || e instanceof RangeError;
    }

    return currentDateSchema.getIn([types && types[0].toLowerCase()]);
  }

  _setCurrentDateSchema({ currentSchema }) {
    this.setState(({ isOpenedState }) => ({
      isOpenedState: !isOpenedState,
    }));

    const { types } = this.props;

    if (!Array.isArray(types)) return null;

    return types.map((item) =>
      this.props.setModalCurrentDateSchema(item.toLowerCase(), currentSchema),
    );
  }

  _renderModalDateSchema() {
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

  render() {
    const { isOpenedState } = this.state;

    return (
      <div className={_['custom-alter-period']}>
        <ClickOutside
          currentState={isOpenedState}
          emitOnClick={(payload) => {
            this.setState({
              isOpenedState: payload,
            });
          }}
        >
          <button
            style={
              isOpenedState
                ? customAlertButtonRadius[1]
                : customAlertButtonRadius[0]
            }
            className={_['custom-alter-period-date']}
            type="submit"
          >
            {this._currentDate}
            <span
              style={{
                transform: `rotate(${isOpenedState ? 180 : 0}deg)`,
              }}
              className={_['custom-alter-period-date_dropdown']}
            ></span>
          </button>

          <CSSTransition
            in={isOpenedState}
            timeout={300}
            classNames="dropdown"
            unmountOnExit
          >
            {this._renderModalDateSchema()}
          </CSSTransition>
        </ClickOutside>
      </div>
    );
  }
}
