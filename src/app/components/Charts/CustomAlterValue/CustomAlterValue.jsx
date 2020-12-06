import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from './CustomAlterValue.scss';

export class CustomAlterValue extends PureComponent {
  static propTypes = {
    schema: PropTypes.object,
  };

  get _preLastIndex() {
    const { schema } = this.props;
    return (
      schema &&
      (schema.get(-2) ? schema.get(-2).symbol || 0 : schema.get(-1).symbol || 0)
    );
  }

  get _lastIndex() {
    const { schema } = this.props;
    return schema && (schema.get(-1).symbol || 0);
  }

  get _totalRatio() {
    try {
      if (!this._lastIndex) {
        throw new RangeError('[Last Index can not be equal to 0]');
      }

      if (!this._preLastIndex) {
        throw new RangeError('[Pre Last Index can not be equal to 0]');
      }

      return ((this._lastIndex / this._preLastIndex) * 100).toFixed(2);
    } catch (e) {
      return null;
    }
  }

  _renderEquivalently() {
    return (
      <div className={_['custom-alter-value_equal']}>
        <span>= {this._totalRatio}</span>
      </div>
    );
  }

  _renderPrevGreaterThanCurrent() {
    return (
      <div className={_['custom-alter-value_greater']}>
        <span> - {this._totalRatio}</span>
      </div>
    );
  }

  _renderPrevLessThanCurrent() {
    return (
      <div className={_['custom-alter-value_less']}>
        <span> + {this._totalRatio}</span>
      </div>
    );
  }

  render() {
    return (
      <div className={_['custom-alter-value']}>
        {this._lastIndex === this._preLastIndex && this._renderEquivalently()}
        {this._preLastIndex > this._lastIndex &&
          this._renderPrevGreaterThanCurrent()}
        {this._preLastIndex < this._lastIndex &&
          this._renderPrevLessThanCurrent()}
      </div>
    );
  }
}
