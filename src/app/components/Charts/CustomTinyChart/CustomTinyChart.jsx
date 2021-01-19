/* eslint-disable object-curly-newline, no-shadow */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { connect as Connect } from 'react-redux';
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import toNumber from 'lodash/toNumber';
import schema from '@styles/_schema.scss';

import { CustomActiveDot } from '../CustomActiveDot/CustomActiveDot';
import { CustomToolTip } from '../CustomToolTip/CustomToolTip';
import { CustomAlterValue } from '../CustomAlterValue/CustomAlterValue';
import SkeletonLoading from '../../SkeletonLoading/SkeletonLoading';

import _ from './CustomTinyChart.scss';
import { coercedMoment } from '~/app/shared/coercedMoment';
import { getChartCurrentDate, Period } from '~/app/selectors';
import { chartConfig } from '~/chartConfig';

const CUSTOM_TINY_CHART_FACTORY = () => ({
  color: '#fff',
  type: 'default',
  height: 100,
});

@Connect(
  (state) => ({
    currentDates: getChartCurrentDate(state),
  }),
  null,
)
export default class CustomTinyChart extends PureComponent {
  constructor(props) {
    super(props);
    this._definePropertyDescription = this._definePropertyDescription.bind(
      this,
    );
    this.state = {
      tinyList: null,
    };
  }

  static propTypes = {
    data: PropTypes.object,
    color: PropTypes.string,
    type: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    currentDates: PropTypes.object,
  };

  static defaultProps = CUSTOM_TINY_CHART_FACTORY();

  _definePropertyDescription() {
    const { type } = this.props;
    return `color${type.charAt(0).toUpperCase()}${type.slice(1)}`;
  }

  get _isWSEnabled() {
    const { type, currentDates } = this.props;
    if (!currentDates.has(type.toLowerCase())) return false;

    const currentDate = currentDates.get(type.toLowerCase());

    console.log(currentDate);

    return null;
  }

  static getDerivedStateFromProps(prevProps, prevState) {
    const { data, currentDates, type } = prevProps;
    return {
      tinyList: List(data)
        .toArray()
        .map(({ delta, timestamp }) => ({
          delta,
          timestamp: coercedMoment(
            currentDates.has(type.toLowerCase())
              ? currentDates.get(type.toLowerCase())
              : Period.AllTime,
          ),
        })),
    };
  }

  render() {
    const { color, data } = this.props;
    const { tinyList } = this.state;

    if (!tinyList.length) {
      return <SkeletonLoading height={chartConfig.tinyHeight} />;
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
                  data={tinyList}
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
                    dataKey="delta"
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
