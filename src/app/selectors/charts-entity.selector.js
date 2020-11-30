import { createSelector } from 'reselect';

export const getChartsEntity = (state) => state.get('chartsEntity');

export const getChartImpression = createSelector(getChartsEntity, (chart) =>
  chart.get('impressions'),
);

export const getChartUsers = createSelector(getChartsEntity, (chart) =>
  chart.get('users'),
);

export const getChartPosts = createSelector(getChartsEntity, (chart) =>
  chart.get('plays'),
);

export const getChartPlays = createSelector(getChartsEntity, (chart) =>
  chart.get('posts'),
);
