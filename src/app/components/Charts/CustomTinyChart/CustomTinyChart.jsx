/* eslint-disable object-curly-newline */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

import schema from '@styles/_schema.scss';

import { CustomActiveDot } from '../CustomActiveDot/CustomActiveDot';
import { CustomToolTip } from '../CustomToolTip/CustomToolTip';

import _ from './CustomTinyChart.scss';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const CUSTOM_TINY_CHART_FACTORY = () => ({
  color: '#fff',
  type: 'uv',
});

export default class CustomTinyChart extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
    type: PropTypes.string,
  };

  static defaultProps = CUSTOM_TINY_CHART_FACTORY();

  _definePropertyDescription() {
    const { type } = this.props;
    return `color${type.charAt(0).toUpperCase()}${type.slice(1)}`;
  }

  render() {
    const { color } = this.props;

    return (
      <div className={_['custom-tiny-chart']}>
        <div className={_['custom-tiny-chart-wrapper']}>
          <div className={schema.row}>
            <div className={schema['col-12']}>
              <ResponsiveContainer
                className={_['custom-tiny-chart-wrapper_graph']}
                width="100%"
                height={100}
              >
                <AreaChart
                  cursor="pointer"
                  data={data}
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
}
