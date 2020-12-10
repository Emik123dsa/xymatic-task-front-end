/* eslint-disable object-curly-newline, no-confusing-arrow */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Brush,
} from 'recharts';
import moment from 'moment';
import schema from '@styles/_schema.scss';
import _ from './CustomEssentialChart.scss';

import { CustomLegend } from '../CustomLegend/CustomLegend';
import { CustomActiveDot } from '../CustomActiveDot/CustomActiveDot';
import { CustomToolTip } from '../CustomToolTip/CustomToolTip';

const coerceToDaysBetween = (startDate, endDate, separator) => {
  const date = [];
  const currentDate = moment(startDate).startOf(separator);
  const lastDate = moment(endDate).startOf(separator);

  while (currentDate.add(1, `${separator}s`).diff(lastDate) <= 0) {
    date.push(currentDate.clone().toDate());
  }
  return date;
};

let coercedDays = coerceToDaysBetween('2019-02-15', '2020-01-15', 'month');

coercedDays = coercedDays.map((item) => ({
  timestamp: moment(item).format('MMM'),
  uv: Math.random().toFixed(2),
  pv: Math.random().toFixed(2),
}));

const CUSTOM_ESSENTIAL_CHART_FACTORY = () => ({
  content: [
    {
      type: 'uv',
      color: '#fff',
    },
    {
      type: 'pv',
      color: '#0c0c0c',
    },
  ],
  height: 400,
  title: 'Default',
});

export class CustomEssentialChart extends PureComponent {
  static propTypes = {
    content: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        color: PropTypes.string,
      }),
    ),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
  };

  static defaultProps = CUSTOM_ESSENTIAL_CHART_FACTORY();

  _renderLinearGradient() {
    const { content } = this.props;

    return (
      content &&
      content.map((item, index) => (
        <linearGradient key={index} id={item.type} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={item.color} stopOpacity={0.2} />
          <stop offset="95%" stopColor={item.color} stopOpacity={0} />
        </linearGradient>
      ))
    );
  }

  _renderAreaChart() {
    const { content } = this.props;

    return (
      content &&
      content.map((item, index) => (
        <Area
          key={index}
          activeDot={<CustomActiveDot fill={item.color} />}
          textAnchor="top"
          type="monotone"
          dataKey={item.type}
          stroke={item.color}
          fillOpacity={1}
          strokeWidth="2"
          fill={`url(#${item.type})`}
        ></Area>
      ))
    );
  }

  render() {
    const { height, title, content } = this.props;
    return (
      <div className={_['custom-essential-chart']}>
        <div className={_['custom-essential-chart-wrapper']}>
          <div className={schema.row}>
            <div className={schema['col-12']}>
              <ResponsiveContainer
                className={_['custom-essential-chart-wrapper_graph']}
                width="100%"
                height={+height}
              >
                <AreaChart
                  cursor="pointer"
                  data={coercedDays}
                  margin={{ top: 30, right: 30, left: 0, bottom: 20 }}
                >
                  {/* <Brush
                    // startIndex={26}
                    // endIndex={30}
                    dataKey="name"
                    height={30}
                    stroke="#8884d8"
                  /> */}
                  <Legend
                    verticalAlign="top"
                    align="right"
                    height="3rem"
                    content={<CustomLegend title={title} />}
                  />

                  <defs>{this._renderLinearGradient()}</defs>

                  <Tooltip
                    cursor={false}
                    offset={-26}
                    content={
                      <CustomToolTip fill={content.map((item) => item.color)} />
                    }
                  />

                  <CartesianGrid
                    stroke="#4E5B6F"
                    strokeOpacity="0.3"
                    strokeWidth="1"
                    strokeDasharray="2 6"
                    vertical={false}
                  />

                  <YAxis
                    width={40}
                    orientation="left"
                    tickFormatter={(label) =>
                      label > 1000 ? `${label / 1000}k` : label
                    }
                    axisLine={false}
                    tick={{
                      stroke: '#4E5B6F',
                      fontSize: '0.6rem',
                      fontFamily: 'Montserrat Light',
                    }}
                    tickLine={false}
                  />
                  <XAxis
                    tick={{
                      stroke: '#4E5B6F',
                      fontSize: '0.6rem',
                      fontFamily: 'Montserrat Light',
                    }}
                    type="string"
                    tickMargin={16}
                    interval={0}
                    scale="point"
                    axisLine={false}
                    dataKey="timestamp"
                    tickLine={false}
                  />
                  {this._renderAreaChart()}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomEssentialChart;
