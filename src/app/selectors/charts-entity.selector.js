import { createSelector } from 'reselect';

export const isWSChart = (item) => item.toUpperCase() === 'REAL TIME';

export const getChartsEntity = (state) => state.get('chartsEntity');

export const getChartCurrentDate = createSelector(getChartsEntity, (chart) =>
  chart.map((item) => item.getIn(['CURRENT_DATE_SCHEMA', 0])),
);

export const getEventChannel = (state, chart) =>
  state.getIn(['chartsEntity', chart, 'EVENT_CHANNEL']);

export const getChartImpression = createSelector(getChartsEntity, (chart) =>
  chart.getIn(['impressions', 'data']),
);

export const getChartUsers = createSelector(getChartsEntity, (chart) =>
  chart.getIn(['users', 'data']),
);

export const getChartPosts = createSelector(getChartsEntity, (chart) =>
  chart.getIn(['posts', 'data']),
);

export const getChartPlays = createSelector(getChartsEntity, (chart) =>
  chart.getIn(['plays', 'data']),
);
