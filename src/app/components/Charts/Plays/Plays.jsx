/* eslint-disable object-curly-newline */
import React, { useState, useLayoutEffect, useMemo } from 'react';

import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import schema from '@styles/_schema.scss';
import _ from './Plays.scss';

const data = [
  {
    name: 'Page A',
    uv: 1600,
  },
  {
    name: 'Page B',
    uv: 3000,
  },
  {
    name: 'Page C',
    uv: 2000,
  },
  {
    name: 'Page D',
    uv: 2780,
  },
  {
    name: 'Page E',
    uv: 1890,
  },
  {
    name: 'Page F',
    uv: 2390,
  },
  {
    name: 'Page G',
    uv: 3490,
  },
  {
    name: 'Page G',
    uv: 1590,
  },
  {
    name: 'Page G',
    uv: 2890,
  },
  {
    name: 'Page G',
    uv: 3290,
  },
  {
    name: 'Page G',
    uv: 2800,
  },
  {
    name: 'Page G',
    uv: 2400,
  },
];

const ImpressionsChart = (props) => {
  console.log(props);

  return (
    <div style={{ cursor: 'pointer' }} className={_.plays}>
      <div className={_['plays-wrapper']}>
        <div className={schema.row}>
          <div className={schema['col-2']}>
            <div className={_['plays-wrapper_block']}></div>
          </div>
          <div className={schema['col-10']}>
            <ResponsiveContainer width="100%" height={100}>
              <AreaChart
                data={data}
                margin={{ top: 25, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUvRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef263d" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef263d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#ef263d"
                  strokeWidth="2"
                  fillOpacity={1}
                  fill="url(#colorUvRed)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpressionsChart;
