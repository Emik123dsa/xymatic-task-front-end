/* eslint-disable no-tabs */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from './CustomToolTip.scss';

export class CustomToolTip extends PureComponent {
  static propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    payload: PropTypes.array,
    active: PropTypes.bool,
    fill: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  };

  render() {
    const { payload, active, fill } = this.props;

    if (!(active && payload)) return null;

    return (
      <div className={_['custom-tool-tip']}>
        {payload.map((item, index) => (
          <div
            key={index}
            style={{
              background:
                Array.isArray(fill) && fill.length > 0
                  ? fill && fill[index]
                  : fill,
            }}
            className={_['custom-tool-tip_wrapper']}
          >
            <span className={_['custom-tool-tip_label']}>
              {item?.value.toString()}
            </span>
            <span className={_['custom-tool-tip_arrow']}>
              <svg
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 552.611 552.611"
              >
                <path
                  style={{
                    fill:
                      Array.isArray(fill) && fill.length > 0
                        ? fill && fill[index]
                        : fill,
                  }}
                  d="M486.413,221.412L122.347,12.916c-52.938-30.318-95.852-5.44-95.852,55.563v415.652c0,61.004,42.914,85.882,95.852,55.563
  l364.066-208.49C539.351,300.887,539.351,251.731,486.413,221.412z"
                />
              </svg>
            </span>
          </div>
        ))}
      </div>
    );
  }
}
