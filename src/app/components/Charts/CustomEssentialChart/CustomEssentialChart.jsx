/* eslint-disable object-curly-newline, no-confusing-arrow, indent, import/order */
import React, { Fragment, PureComponent } from 'react';
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
import loadable from '@loadable/component';

import { connect as Connect } from 'react-redux';
import { chartConfig } from '~/chartConfig';
import { coercedCtx, coercedMoment } from '~/app/shared/coerced.moment';
import schema from '@styles/_schema.scss';
import SkeletonLoading from '@/components/SkeletonLoading/SkeletonLoading';
import _ from './CustomEssentialChart.scss';
import { CustomLegend } from '../CustomLegend/CustomLegend';
import { CustomActiveDot } from '../CustomActiveDot/CustomActiveDot';
import { CustomToolTip } from '../CustomToolTip/CustomToolTip';
import { getChartCurrentDate, isWSChart, Period } from '~/app/selectors';
import { css } from 'aphrodite';
import { styles } from '~/app/shared/coerced.styles';
import { classnames } from '~/app/shared/coerced.classnames';

const Moment = loadable.lib(() => import('moment'));

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
    direction: PropTypes.string,
  };

  static defaultProps = CUSTOM_ESSENTIAL_CHART_FACTORY();

  get _animateWrapperDirection() {
    const { direction } = this.props;
    return classnames(
      css(
        direction.startsWith('left') ? styles.slideInLeft : styles.slideInRight,
      ),
      'appear',
      _['custom-essential-chart-wrapper'],
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      dataList: null,
    };

    this.moment = React.createRef();
  }

  static getDerivedStateFromProps(prevProps, prevState) {
    const { content, currentDates } = prevProps;

    const dateType = content.map(({ type }) =>
      currentDates.has(type.toLowerCase())
        ? currentDates.get(type.toLowerCase())
        : Period.AllTime,
    );

    return {
      dataList: coercedCtx(content, dateType && dateType[0]).map((item) => ({
        ...item,
        timestamp: coercedMoment(dateType && dateType[0], item?.timestamp),
      })),
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
          dataKey={`delta${item.type}`}
          stroke={item.color}
          fillOpacity={1}
          strokeWidth="2"
          fill={`url(#${item.type})`}
        ></Area>
      ))
    );
  }

  get _isWsChartLoading() {
    const { content, currentDates } = this.props;
    const { dataList } = this.state;

    return content.every(({ type }) => {
      if (currentDates.has(type.toLowerCase())) {
        if (currentDates.get(type.toLowerCase()) === Period.RealTime) {
          if (dataList.length < chartConfig.maxLength / 6) {
            return true;
          }
          return false;
        }
        return false;
      }
      return false;
    });
  }

  _renderDataLoading() {
    return <SkeletonLoading height={chartConfig.essentialHeight} />;
  }

  render() {
    const { height, title, content } = this.props;
    const { dataList } = this.state;

    if (
      !Array.isArray(dataList) ||
      dataList.every((item) => Array.isArray(item) && !item.length)
    ) {
      return this._renderDataLoading();
    }

    if (this._isWsChartLoading) {
      return this._renderDataLoading();
    }

    return (
      <Fragment>
        <div className={_['custom-essential-chart']}>
          <div className={this._animateWrapperDirection}>
            <div className={schema.row}>
              <div className={schema['col-12']}>
                <ResponsiveContainer
                  className={_['custom-essential-chart-wrapper_graph']}
                  width="100%"
                  height={+height}
                >
                  <AreaChart
                    cursor="pointer"
                    data={dataList}
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
                      position="top"
                      content={
                        <CustomToolTip
                          fill={content.map((item) => item.color)}
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
                        fontFamily: 'Montserrat Light',
                      }}
                      scale="auto"
                      tickMargin={16}
                      interval="preserveStart"
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
        <Moment ref={this.moment} />
      </Fragment>
    );
  }
}

export default CustomEssentialChart;
