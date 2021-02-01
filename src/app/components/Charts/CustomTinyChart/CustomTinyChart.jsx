/* eslint-disable object-curly-newline, no-shadow */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isImmutable, isMap, List } from 'immutable';
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

import { BehaviorSubject, of } from 'rxjs';
import {
  distinctUntilChanged,
  scan,
  takeWhile,
  map,
  pairwise,
  switchMap,
} from 'rxjs/operators';
import { hot } from 'react-hot-loader/root';
import { css } from 'aphrodite';
import { CustomActiveDot } from '../CustomActiveDot/CustomActiveDot';
import { CustomToolTipTiny } from '../CustomToolTip/CustomToolTipTiny';
import SkeletonLoading from '../../SkeletonLoading/SkeletonLoading';
import _ from './CustomTinyChart.scss';
import { coercedMoment } from '~/app/shared/coercedMoment';
import { getChartCurrentDate, Period } from '~/app/selectors';
import { chartConfig } from '~/chartConfig';
import { classnames } from '~/app/shared/coercedClassnames';
import { styles } from '~/app/shared/coercedStyles';
import { CustomTinyLegend } from '../CustomTinyLegend/CustomTinyLegend';

const CUSTOM_TINY_CHART_FACTORY = () => ({
  color: '#fff',
  type: 'default',
  height: 100,
});

@hot
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

    this._emitOnTouched = this._emitOnTouched.bind(this);

    this.state = {
      previousToolTipValue: 0,
      tinyList: null,
    };
  }

  static propTypes = {
    data: PropTypes.object,
    color: PropTypes.string,
    type: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    currentDates: PropTypes.object,
    direction: PropTypes.string,
  };

  static defaultProps = CUSTOM_TINY_CHART_FACTORY();

  _definePropertyDescription() {
    const { type } = this.props;
    return `color${type.charAt(0).toUpperCase()}${type.slice(1)}`;
  }

  _customToolTipValueSubject = new BehaviorSubject(0);

  _customToolTip = this._customToolTipValueSubject.asObservable().pipe(
    distinctUntilChanged(),
    pairwise(),
    switchMap(([oldValue, newValue]) => of(oldValue)),
    takeWhile(() => !this._customToolTipValueSubject.closed),
  );

  _emitOnTouched($payload) {
    this._customToolTipValueSubject.next($payload && $payload[0]);
  }

  get _animateWrapperDirection() {
    const { direction } = this.props;
    return classnames(
      _['custom-tiny-chart-wrapper'],
      'appear',
      css(
        direction.startsWith('left') ? styles.slideInLeft : styles.slideInRight,
      ),
    );
  }

  get _isWSEnabled() {
    const { type, currentDates } = this.props;
    if (!currentDates.has(type.toLowerCase())) return false;
    const currentDate = currentDates.get(type.toLowerCase());
    return null;
  }

  componentDidMount() {
    this._customToolTip.subscribe(($event) => {
      this.setState((prevState) => ({
        previousToolTipValue: $event,
      }));
    });
  }

  componentWillUnmount() {
    if (this._customToolTipValueSubject) {
      this._customToolTipValueSubject.unsubscribe();
      this._customToolTipValueSubject = null;
    }
  }

  static getDerivedStateFromProps(prevProps, prevState) {
    const { data, currentDates, type } = prevProps;

    return {
      tinyList: List(data)
        .toArray()
        .map((data) => ({
          delta: data.has('delta') ? data.getIn(['delta']) : null,
          timestamp: coercedMoment(
            currentDates.has(type.toLowerCase())
              ? currentDates.get(type.toLowerCase())
              : Period.AllTime,
          ),
        })),
    };
  }

  render() {
    const { color, type } = this.props;
    const { tinyList, previousToolTipValue } = this.state;

    if (!tinyList.length) {
      return <SkeletonLoading height={chartConfig.tinyHeight} />;
    }

    return (
      <div className={_['custom-tiny-chart']}>
        <div className={this._animateWrapperDirection}>
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
                  margin={{ top: 45, right: 25, left: 65, bottom: 0 }}
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
                  <Legend
                    verticalAlign="top"
                    align="left"
                    height="100"
                    content={<CustomTinyLegend color={color} type={type} />}
                  ></Legend>
                  <Tooltip
                    position={{
                      x: 45,
                      y: 0,
                    }}
                    cursor={false}
                    content={
                      <CustomToolTipTiny
                        prevValue={previousToolTipValue}
                        emitOnTouched={this._emitOnTouched}
                      />
                    }
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
