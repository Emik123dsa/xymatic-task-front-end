/* eslint-disable object-curly-newline, no-shadow */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { toNumber } from 'lodash';
import schema from '@styles/_schema.scss';

import { CustomActiveDot } from '../CustomActiveDot/CustomActiveDot';
import { CustomToolTip } from '../CustomToolTip/CustomToolTip';
import { CustomAlterValue } from '../CustomAlterValue/CustomAlterValue';
import SkeletonLoading from '../../SkeletonLoading/SkeletonLoading';

import _ from './CustomTinyChart.scss';

const CUSTOM_TINY_CHART_FACTORY = () => ({
  color: '#fff',
  type: 'uv',
  height: 100,
});

export default class CustomTinyChart extends PureComponent {
  constructor(props) {
    super(props);

    this._definePropertyDescription = this._definePropertyDescription.bind(
      this,
    );
  }

  static propTypes = {
    data: PropTypes.object,
    color: PropTypes.string,
    type: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  static defaultProps = CUSTOM_TINY_CHART_FACTORY();

  _definePropertyDescription() {
    const { type } = this.props;
    return `color${type.charAt(0).toUpperCase()}${type.slice(1)}`;
  }

  render() {
    const { color, data } = this.props;

    if (!(data && data.size > 1)) {
      return <SkeletonLoading height={100} />;
    }

    return (
      <div className={_['custom-tiny-chart']}>
        <div className={_['custom-tiny-chart-wrapper']}>
          <div className={schema.row}>
            <div className={schema['col-12']}>
              <ResponsiveContainer
                className={_['custom-tiny-chart-wrapper_graph']}
                width="100%"
                height={this.heightTinyChart}
              >
                <AreaChart
                  cursor="pointer"
                  data={List(data)
                    .map((item) => ({
                      uv: item.symbol,
                      name: item.ldt,
                    }))
                    .toJS()}
                  margin={{ top: 25, right: 25, left: 45, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id={this._definePropertyDescription()}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <svg
                    width="45"
                    height="100"
                    fill={color}
                    viewBox="0 0 45 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="0" y="0" width="100%" height="100%" />
                  </svg>

                  <Legend
                    verticalAlign="top"
                    align="right"
                    height="3rem"
                    content={<CustomAlterValue schema={List(data)} />}
                  />

                  <Tooltip
                    cursor={false}
                    content={<CustomToolTip fill={color} />}
                  />

                  <Area
                    activeDot={<CustomActiveDot fill={color} />}
                    type="monotone"
                    dataKey="uv"
                    stroke={color}
                    strokeWidth="2"
                    fillOpacity={1}
                    fill={`url(#${this._definePropertyDescription()})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  get heightTinyChart() {
    return typeof this.props.height === 'string'
      ? toNumber(this.props.height)
      : this.props.height;
  }
}
