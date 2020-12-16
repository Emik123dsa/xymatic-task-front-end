import { createSelector } from 'reselect';
import { isRealTime } from './modal.selector';

export const CHART_LENGTH_RESTRICTION = 12;

export const isWSChart = (item) => item.toUpperCase() === isRealTime;

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
