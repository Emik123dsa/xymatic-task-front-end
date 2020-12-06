import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from './CustomToolTip.scss';

export class CustomToolTip extends PureComponent {
  static propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    payload: PropTypes.array,
    active: PropTypes.bool,
    fill: PropTypes.string,
  };

  render() {
    const { payload, active, fill } = this.props;

    if (!(active && payload && payload[0])) return null;

    return (
      <div className={_['custom-tool-tip']}>
        <div
          style={{ background: fill }}
          className={_['custom-tool-tip_wrapper']}
        >
          <span className={_['custom-tool-tip_label']}>
            {payload && payload[0]?.value.toString()}
          </span>
        </div>
      </div>
    );
  }
}
