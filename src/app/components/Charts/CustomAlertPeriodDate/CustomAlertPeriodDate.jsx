import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect as Connect } from 'react-redux';
import { List } from 'immutable';
import { setModalIsOpened } from '~/app/actions';
import { getModalDateSchema, getModalOpenedState } from '~/app/selectors';
import { ClickOutside } from '~/app/shared/clickOutside/ClickOutside';

import _ from './CustomAlertPeriodDate.scss';

@Connect(
  (state) => ({
    isOpenedState: getModalOpenedState(state),
    dateSchema: getModalDateSchema(state),
  }),
  {
    setModalIsOpened,
  },
)
export class CustomAlertPeriodDate extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: false,
    };

    this._handleClick = this._handleClick.bind(this);
  }

  static propTypes = {
    setModalIsOpened: PropTypes.func,
    isOpenedState: PropTypes.bool,
    dateSchema: PropTypes.object,
  };

  _handleClick(payload) {
    this.props.setModalIsOpened({ payload });
  }

  _renderModalDateSchema() {
    if (this.props.isOpenedState) {
      return (
        <div className={_['custom-alter-period-date-credentials']}>
          <aside className={_['custom-alter-period-date-credentials_wrapper']}>
            <nav className={_['custom-alter-period-date-credentials_navbar']}>
              <ul className={_['custom-alter-period-date-credentials_list']}>
                {List(this.props.dateSchema).map((item, index) => {
                  console.log(item.get('0'));

                  return <li key={index}> {item.get('0')}</li>;
                })}
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
      <Fragment>
        <ClickOutside emitOnClick={this._handleClick}>
          <button className={_['custom-alter-period-date']} type="submit">
            Montly
            <span className={_['custom-alter-period-date_dropdown']}></span>
          </button>
        </ClickOutside>

        {this._renderModalDateSchema()}
      </Fragment>
    );
  }
}
