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

let coercedDays = coerceToDaysBetween('2019-12-15', '2020-01-15', 'day');

coercedDays = coercedDays.map((item) => ({
  name: moment(item).format('DD MMM'),
  uv: Math.random(),
}));

const CUSTOM_ESSENTIAL_CHART_FACTORY = () => ({
  color: ['#fff', '#0c0c0c0'],
  type: 'uv',
  height: 400,
  title: 'Users',
});

export class CustomEssentialChart extends PureComponent {
  constructor(props) {
    super(props);

    this._definePropertyDescription = this._definePropertyDescription.bind(
      this,
    );
  }

  static propTypes = {
    color: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    type: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
  };

  static defaultProps = CUSTOM_ESSENTIAL_CHART_FACTORY();

  componentDidMount() {}

  _definePropertyDescription() {
    const { type } = this.props;
    return `color${type.charAt(0).toUpperCase()}${type.slice(1)}`;
  }

  render() {
    const { color, type, height, title } = this.props;

    return (
      <div className={_['custom-essential-chart']}>
        <div className={_['custom-essential-chart-wrapper']}>
          <div className={schema.row}>
            <div className={schema['col-12']}>
              <ResponsiveContainer
                className={_['custom-essential-chart-wrapper_graph']}
                width="100%"
                height={400}
              >
                <AreaChart
                  cursor="pointer"
                  data={coercedDays}
                  margin={{ top: 30, right: 30, left: 0, bottom: 20 }}
                >
                  <Brush
                    startIndex={26}
                    endIndex={30}
                    dataKey="name"
                    height={30}
                    stroke="#8884d8"
                  />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    height="3rem"
                    content={<CustomLegend title={title} />}
                  />

                  <defs>
                    <linearGradient
                      id={`custom${this._definePropertyDescription()}SecondChart`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={this._colorsDetailsFeatured(0)}
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor={this._colorsDetailsFeatured(0)}
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient
                      id={`custom${this._definePropertyDescription()}FirstChart`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={this._colorsDetailsFeatured(1)}
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor={this._colorsDetailsFeatured(1)}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <Tooltip
                    cursor={false}
                    offset={-26}
                    content={
                      <CustomToolTip
                        fill={[
                          this._colorsDetailsFeatured(1),
                          this._colorsDetailsFeatured(0),
                        ]}
                      />
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
                      fontWeight: '400',
                      fontFamily: 'Montserrat Light',
                    }}
                    type="string"
                    tickMargin={16}
                    interval={0}
                    scale="point"
                    axisLine={false}
                    dataKey="name"
                    tickLine={false}
                  />
                  <Area
                    activeDot={
                      <CustomActiveDot fill={this._colorsDetailsFeatured(1)} />
                    }
                    textAnchor="top"
                    type="monotone"
                    dataKey="pv"
                    stroke={this._colorsDetailsFeatured(1)}
                    fillOpacity={1}
                    strokeWidth="2"
                    fill={`url(#custom${this._definePropertyDescription()}FirstChart)`}
                  ></Area>

                  <Area
                    activeDot={
                      <CustomActiveDot fill={this._colorsDetailsFeatured(0)} />
                    }
                    type="monotone"
                    dataKey="uv"
                    stroke={this._colorsDetailsFeatured(0)}
                    strokeWidth="2"
                    fillOpacity={1}
                    fill={`url(#custom${this._definePropertyDescription()}SecondChart)`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  get _colorsDetailsFeatured() {
    const { color } = this.props;
    return (index) => {
      if (Array.isArray(color) && color.length > 0) {
        if (!color[index]) {
          throw new RangeError(
            `[Color] : ${index} on the color is not defined`,
          );
        } else {
          return color[index];
        }
      } else {
        return color;
      }
    };
  }
}

export default CustomEssentialChart;
