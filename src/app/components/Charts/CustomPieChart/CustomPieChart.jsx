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
} from 'recharts';
import toNumber from 'lodash/toNumber';
import schema from '@styles/_schema.scss';
import _ from './CustomPieChart.scss';

const PAYLOAD = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group C', value: 200 },
];

const COLORS = ['#602dd3', '#3f4af1', '#ef263d', '#eee'];

const CUSTOM_PIE_CHART_FACTORY = () => ({
  colors: COLORS,
  type: 'uv',
  height: 200,
  data: PAYLOAD,
});

export class CustomPieChart extends PureComponent {
  static propTypes = {
    colors: PropTypes.array,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    data: PropTypes.array,
    title: PropTypes.string,
  };

  static defaultProps = CUSTOM_PIE_CHART_FACTORY();

  get _totalInitilValues() {
    const { data } = this.props;

    let amount = 0;

    if (Array.isArray(data) && data.length > 0) {
      data.reduce((acc, item) => {
        acc =
          (item && typeof item.value === 'string'
            ? toNumber(item.value)
            : item.value) || 0;
        amount += acc;
        return acc;
      }, {});
    }

    return amount >= 1000 ? `${(amount / 1000).toFixed(2)}k` : amount;
  }

  get _heightPieChart() {
    return typeof this.props.height === 'string'
      ? toNumber(this.props.height)
      : this.props.height;
  }

  render() {
    const { colors, data } = this.props;
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
                    innerRadius={45}
                    outerRadius={60}
                    fill="#000"
                    paddingAngle={-12}
                    dataKey="value"
                    isAnimationActive={true}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                    <Label
                      className={_['custom-pie-chart-wrapper_label']}
                      offset={0}
                      position="center"
                    >
                      {this._totalInitilValues}
                    </Label>
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomPieChart;
