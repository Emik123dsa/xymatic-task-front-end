/* eslint-disable no-param-reassign */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label,
  Text,
  LabelList,
} from 'recharts';
import { BarChart } from '@/components/Icons/BarChart';
import toNumber from 'lodash/toNumber';
import schema from '@styles/_schema.scss';
import SkeletonLoading from '@/components/SkeletonLoading/SkeletonLoading';
import { coercedThousandNumbers } from '@/shared/coercedNumber';
import { css } from 'aphrodite';
import _ from './CustomPieChart.scss';
import { chartConfig } from '~/chartConfig';
import { styles } from '~/app/shared/coercedStyles';
import { classnames } from '~/app/shared/coercedClassnames';

const CUSTOM_PIE_CHART_FACTORY = () => ({
  colors: [],
  height: 200,
  data: [],
  exception: ['triggers', 'roles'],
});

export class CustomPieChart extends PureComponent {
  static propTypes = {
    colors: PropTypes.array,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    data: PropTypes.object,
    title: PropTypes.string,
    exception: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  static defaultProps = CUSTOM_PIE_CHART_FACTORY();

  get _totalInitilValues() {
    const { data } = this.state;

    let _amount = 0;

    if (Array.isArray(data) && data.length > 0) {
      _amount = data.reduce((acc, { count }) => {
        acc += typeof value === 'string' ? toNumber(count) : count;
        return acc;
      }, 0);
    }

    return _amount;
  }

  get _heightPieChart() {
    return typeof this.props.height === 'string'
      ? toNumber(this.props.height)
      : this.props.height;
  }

  static getDerivedStateFromProps(prevProps, prevState) {
    return {
      data: prevProps.data
        ?.valueSeq()
        .toArray()
        .map((data, index) => ({
          color: (prevProps.colors && prevProps.colors[index]) || '#fff',
          type: data.has('type') ? data.get('type') : null,
          count: data.has('count') ? data.get('count') : null,
        }))
        .filter(
          ({ type }) => !prevProps.exception?.some((exc) => type.endsWith(exc)),
        ),
    };
  }

  _formatTypeString($payload) {
    const prefixType = /^xt_(\w*)/gi;
    const formatType = $payload && $payload.replace(prefixType, '$1');

    return prefixType.test($payload)
      ? `${formatType?.charAt(0).toUpperCase()}${formatType?.slice(1)}`
      : null;
  }

  render() {
    const { data } = this.state;

    console.log(data);

    if (!data.length) {
      return <SkeletonLoading height={chartConfig.essentialHeight} />;
    }

    return (
      <div className={_['custom-pie-chart']}>
        <div className={_['custom-pie-chart-wrapper']}>
          <div className={schema.row}>
            <div className={schema['col-12']}>
              <ResponsiveContainer
                className={_['custom-pie-chart-wrapper_graph']}
                width="100%"
                height={this._heightPieChart}
              >
                <PieChart
                  width="100%"
                  height="100%"
                  stroke="none"
                  fill="#000"
                  paddingAngle={-12}
                  onMouseEnter={this.onPieEnter}
                >
                  <Pie
                    stroke="none"
                    data={data}
                    startAngle={0}
                    cornerRadius={12}
                    innerRadius={50}
                    outerRadius={60}
                    fill="#000"
                    paddingAngle={-12}
                    dataKey="count"
                    isAnimationActive={true}
                  >
                    {data.map(({ color }, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                    <Label
                      className={_['custom-pie-chart-wrapper_label']}
                      offset={0}
                      position="center"
                    >
                      {coercedThousandNumbers(this._totalInitilValues)}
                    </Label>
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className={schema.row}>
              <div className={schema['col-b-12']}>
                <nav className={_['custom-pie-chart_features']}>
                  <ul role="tablist">
                    {data.map(({ count, type, color }, index) => (
                      <li
                        className={classnames(
                          css(styles.slideInLeft),
                          'appear',
                          _['custom-pie-chart_feature'],
                        )}
                        style={{ animationDelay: `${index * 0.075}s` }}
                        key={`${type}-${index}`}
                        role="presentation"
                      >
                        <span
                          className={_['custom-pie-chart_feature-label']}
                          role="tab"
                        >
                          <BarChart color={color} />
                          <span> {this._formatTypeString(type)} </span>
                        </span>
                        <span className={_['custom-pie-chart_feature-input']}>
                          {`${
                            Math.abs(count / this._totalInitilValues).toFixed(
                              2,
                            ) * 100
                          }%`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomPieChart;
