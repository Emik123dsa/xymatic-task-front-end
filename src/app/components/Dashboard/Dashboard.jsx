/* eslint-disable object-curly-newline */
import React, { Component } from 'react';
import { AreaChart, XAxis, YAxis, Area, Tooltip } from 'recharts';
import schema from '@styles/main.scss';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 5200,
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
    pv: 4200,
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

class Dashboard extends Component {
  render() {
    // const data = [ ];

    return (
      // <div className={schema.container}>
      //   <div className={schema.row}>
      //     <div className={schema['col-4']}>Dashboard</div>
      //   </div>
      // </div>
      <div>
        
      </div>
    );
  }
}

export default Dashboard;
