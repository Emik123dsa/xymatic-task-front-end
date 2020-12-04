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
  Legend,
} from 'recharts';

import schema from '@styles/_schema.scss';
import _ from './Impressions.scss';

const data = [
  {
    name: 'Page A',
    uv: 1600,
  },
  {
    name: 'Page B',
    uv: 600,
  },
  {
    name: 'Page C',
    uv: 1000,
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
    <div className={_.impressions}>
      <div className={_['impressions-wrapper']}>
        <div className={schema.row}>
          <div className={schema['col-2']}>
            <div className={_['impressions-wrapper_block']}></div>
          </div>
          <div className={schema['col-10']}>
            <ResponsiveContainer
              className={_['impressions-wrapper-chart']}
              width="100%"
              height={100}
            >
              <AreaChart
                data={data}
                margin={{ top: 25, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3f4af1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3f4af1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                {/* <XAxis dataKey="name" /> */}

                {/* <CartesianGrid strokeDasharray="" /> */}
                <Tooltip cursor={false} />

                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#3f4af1"
                  strokeWidth="2"
                  fillOpacity={1}
                  fill="url(#colorUv)"
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
