/* eslint-disable object-curly-newline */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

import schema from '@styles/_schema.scss';
import _ from './CustomEssentialChart.scss';

import { CustomActiveDot } from '../CustomActiveDot/CustomActiveDot';
import { CustomToolTip } from '../CustomToolTip/CustomToolTip';

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

export class CustomEssentialChart extends PureComponent {
  render() {
    return (
      <div className={_['custom-tiny-chart']}>
        <div className={_['custom-tiny-chart-wrapper']}>
          <div className={schema.row}>
            <div className={schema['col-12']}>
              <ResponsiveContainer
                className={_['custom-tiny-chart-wrapper_graph']}
                width="100%"
                height={400}
              >
                <AreaChart
                  cursor="pointer"
                  data={data}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={'#8884d8'}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={'#8884d8'}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <Tooltip
                    cursor={false}
                    content={<CustomToolTip fill={'#8884d8'} />}
                  />

                  <CartesianGrid strokeDasharray="3 3" />

                  <Area
                    activeDot={<CustomActiveDot fill={'#8884d8'} />}
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    strokeWidth="2"
                    fillOpacity={1}
                    fill={'url(#colorUv)'}
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

export default CustomEssentialChart;
