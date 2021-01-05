/* eslint-disable object-curly-newline, no-confusing-arrow, indent, import/order */
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

import { isImmutable, List } from 'immutable';
import { connect as Connect } from 'react-redux';
import { chartConfig } from '~/chartConfig';
import { coercedMoment } from '@/shared/coercedMoment';
import schema from '@styles/_schema.scss';
import SkeletonLoading from '@/components/SkeletonLoading/SkeletonLoading';
import _ from './CustomEssentialChart.scss';
import { CustomLegend } from '../CustomLegend/CustomLegend';
import { CustomActiveDot } from '../CustomActiveDot/CustomActiveDot';
import { CustomToolTip } from '../CustomToolTip/CustomToolTip';
import { getChartCurrentDate, Period } from '~/app/selectors';

const CUSTOM_ESSENTIAL_CHART_FACTORY = () => ({
  content: [
    {
      type: 'uv',
      color: '#fff',
    },
  ],
  height: chartConfig.essentialHeight,
  title: 'Default',
});

@Connect(
  (state) => ({
    currentDates: getChartCurrentDate(state),
  }),
  null,
)
export class CustomEssentialChart extends PureComponent {
  static propTypes = {
    content: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        data: PropTypes.object,
        color: PropTypes.string,
      }),
    ),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
    currentDates: PropTypes.object,
  };

  static defaultProps = CUSTOM_ESSENTIAL_CHART_FACTORY();

  constructor(props) {
    super(props);
    this.state = {
      dataList: null,
    };
  }

  static getDerivedStateFromProps(prevProps, prevState) {
    const { content, currentDates } = prevProps;
    return {
      dataList: content.map(({ data, type }) =>
        List(data).reduce((acc, item, index) => {
          const _type = type.toLowerCase();
          acc[index] = !isImmutable(item)
            ? {
                delta: item.delta,
                timestamp: coercedMoment(
                  currentDates.has(_type)
                    ? currentDates.get(_type)
                    : Period.AllTime,
                  item.timestamp,
                ),
              }
            : {
                delta: item.get('delta'),
                deltaTotal: item.get('deltaTotal'),
                timestamp: coercedMoment(
                  currentDates.has(_type)
                    ? currentDates.get(_type)
                    : Period.AllTime,
                  item.get('timestamp'),
                ),
              };
          return acc;
        }, []),
      ),
    };
  }

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
          data={this.state.dataList[index]}
          dataKey="delta"
          stroke={item.color}
          fillOpacity={1}
          strokeWidth="2"
          fill={`url(#${item.type})`}
        ></Area>
      ))
    );
  }

  get _isWSChartLoading() {
    const { content, currentDates } = this.props;
    const { dataList } = this.state;

    let isWSChartLoading = false;

    content.forEach(({ type }) => {
      if (currentDates.has(type.toLowerCase())) {
        if (currentDates.get(type.toLowerCase()) === Period.RealTime) {
          if (dataList[0].length < chartConfig.maxLength / 6) {
            isWSChartLoading = true;
          }
        }
      }
    });

    return isWSChartLoading;
  }

  render() {
    const { height, title, content, currentDates } = this.props;

    const { dataList } = this.state;

    if (!Array.isArray(dataList)) return null;

    if (dataList.every((item) => Array.isArray(item) && !item.length)) {
      return <SkeletonLoading height={chartConfig.essentialHeight} />;
    }

    if (this._isWSChartLoading) {
      return <SkeletonLoading height={chartConfig.essentialHeight} />;
    }

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
                  margin={{ top: 30, right: 30, left: 0, bottom: 20 }}
                >
                  <Legend
                    verticalAlign="top"
                    align="right"
                    height="3rem"
                    content={
                      <CustomLegend
                        types={content.map(({ type }) => type)}
                        title={title}
                      />
                    }
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
