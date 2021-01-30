import {
  action,
  createRequestSchema,
  REQUEST,
  SUCCESS,
  FAILURE,
  CLEAN,
} from './actions';

const chartImpressionsEntitySchema = createRequestSchema('CHART_IMPRESSIONS');
const chartPlaysEntitySchema = createRequestSchema('CHART_PLAYS');
const chartPostsEntitySchema = createRequestSchema('CHART_POSTS');
const chartUsersEntitySchema = createRequestSchema('CHART_USERS');

const chartRowsAmountSchema = createRequestSchema('ROWS_AMOUNT');

export const USERS = 'USERS';
export const PLAYS = 'PLAYS';
export const IMPRESSIONS = 'IMPRESSIONS';
export const POSTS = 'POSTS';

export const LOAD_CHART_IMPRESSIONS = 'LOAD_CHART_IMPRESSIONS';
export const LOAD_CHART_POSTS = 'LOAD_CHART_POSTS';
export const LOAD_CHART_PLAYS = 'LOAD_CHART_PLAYS';
export const LOAD_CHART_USERS = 'LOAD_CHART_USERS';

export const LOAD_CHART_ROWS = 'LOAD_CHART_ROWS';

export const LOAD_CHANNEL = 'LOAD_CHANNEL';
export const CLOSE_CHANNEL = 'CLOSE_CHANNEL';

export const RESET_CHARTS_ENTITIES = 'RESET_CHARTS_ENTITIES';

export const chartsImpressionsEntity = {
  request: (payload) =>
    action(chartImpressionsEntitySchema[REQUEST], { payload }),
  success: (payload, success) =>
    action(chartImpressionsEntitySchema[SUCCESS], { payload, success }),
  failure: (payload, error) =>
    action(chartImpressionsEntitySchema[FAILURE], {
      payload,
      error,
    }),
  clean: (clean) => action(chartImpressionsEntitySchema[CLEAN], { clean }),
};

export const chartsPlaysEntity = {
  request: (payload) => action(chartPlaysEntitySchema[REQUEST], { payload }),
  success: (payload, success) =>
    action(chartPlaysEntitySchema[SUCCESS], { payload, success }),
  failure: (payload, error) =>
    action(chartPlaysEntitySchema[FAILURE], {
      payload,
      error,
    }),
  clean: (clean) => action(chartPlaysEntitySchema[CLEAN], { clean }),
};

export const chartsPostsEntity = {
  request: (payload) => action(chartPostsEntitySchema[REQUEST], { payload }),
  success: (payload, success) =>
    action(chartPostsEntitySchema[SUCCESS], { payload, success }),
  failure: (payload, error) =>
    action(chartPostsEntitySchema[FAILURE], {
      payload,
      error,
    }),
  clean: (clean) => action(chartPostsEntitySchema[CLEAN], { clean }),
};

export const chartsUsersEntity = {
  request: (payload) => action(chartUsersEntitySchema[REQUEST], { payload }),
  success: (payload, success) =>
    action(chartUsersEntitySchema[SUCCESS], { payload, success }),
  failure: (payload, error) =>
    action(chartUsersEntitySchema[FAILURE], {
      payload,
      error,
    }),
  clean: (clean) => action(chartUsersEntitySchema[CLEAN], { clean }),
};

export const chartRowsAmountEntity = {
  request: (payload) => action(chartRowsAmountSchema[REQUEST], { payload }),
  success: (payload, rows) =>
    action(chartRowsAmountSchema[SUCCESS], { payload, rows }),
  failure: (payload, error) =>
    action(chartRowsAmountSchema[FAILURE], {
      payload,
      error,
    }),
};

/**
 * We also demand to unsubscribe
 * from eventChannel, which were created by
 * Subscriptions GraphQL
 */
export const loadChannel = (schema, channel) =>
  action(LOAD_CHANNEL, { schema, channel });

export const closeChannel = (close) => action(CLOSE_CHANNEL, { close });

/**
 * Standard Charts Loaders
 * @param {} period
 */
export const loadChartsUsersEntity = (current) =>
  action(LOAD_CHART_USERS, { current, chart: USERS.toLowerCase() });

export const loadChartsImpressionsEntity = (current) =>
  action(LOAD_CHART_IMPRESSIONS, {
    current,
    chart: IMPRESSIONS.toLowerCase(),
  });

export const loadChartsPlaysEntity = (current) =>
  action(LOAD_CHART_PLAYS, {
    current,
    chart: PLAYS.toLowerCase(),
  });

export const loadChartsPostsEntity = (current) =>
  action(LOAD_CHART_POSTS, {
    current,
    chart: POSTS.toLowerCase(),
  });

export const loadChartRowsAmountEntity = (exception) =>
  action(LOAD_CHART_ROWS, { exception });

export const resetChartsEntities = (mode) =>
  action(RESET_CHARTS_ENTITIES, { mode });
