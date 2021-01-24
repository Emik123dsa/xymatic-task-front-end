import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

import CountUp from 'react-countup';
import { BehaviorSubject } from 'rxjs';
import toNumber from 'lodash/toNumber';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { CSSTransition } from 'react-transition-group';
import _ from './CustomToolTip.scss';

export class CustomToolTipTiny extends PureComponent {
  constructor(props) {
    super(props);
    this._formatValue = this._formatValue.bind(this);
    this.state = {
      values: null,
    };
  }

  static propTypes = {
    payload: PropTypes.array,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    emitOnTouched: PropTypes.func,
    prevValue: PropTypes.number,
    active: PropTypes.bool,
    fill: PropTypes.string,
    formatValue: PropTypes.func,
  };

  _formatValue($payload) {
    return typeof $payload === 'number' ? $payload.toFixed(0) : null;
  }

  _comparePrevValue($value) {
    const { prevValue } = this.props;

    if (prevValue < toNumber($value)) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.emitOnTouched(prevState?.values);
  }

  static getDerivedStateFromProps(prevProps, prevState) {
    return {
      values: prevProps.payload.map(({ value }) => value),
    };
  }

  render() {
    const { active, prevValue } = this.props;
    const { values } = this.state;

    if (!(active && values)) return null;

    return (
      <Fragment>
        <CSSTransition
          in={active}
          timeout={300}
          classNames="dropdown"
          unmountOnExit
        >
          <div className={_['custom-tool-tip']}>
            {values.map((item, index) => (
              <div
                key={`${item}-${index.toString()}`}
                className={_['custom-tool-tip_tiny']}
              >
                <span className={_['custom-tool-tip_tiny-label']}>
                  <CountUp
                    start={prevValue}
                    end={item}
                    duration={0.5}
                    separator=" "
                    decimals={0}
                  />
                </span>
              </div>
            ))}
          </div>
        </CSSTransition>
      </Fragment>
    );
  }
}
