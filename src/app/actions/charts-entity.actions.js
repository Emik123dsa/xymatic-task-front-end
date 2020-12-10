import { callGraphQLApi } from '@/services';

import {
  action,
  createRequestSchema,
  REQUEST,
  SUCCESS,
  FAILURE,
} from './actions';

const chartImpressionsEntitySchema = createRequestSchema('CHART_IMPRESSIONS');

const chartPlaysEntitySchema = createRequestSchema('CHART_PLAYS');

const chartPostsEntitySchema = createRequestSchema('CHART_POSTS');

const chartUsersEntitySchema = createRequestSchema('CHART_USERS');

export const LOAD_CHART_IMPRESSIONS = 'LOAD_CHART_IMPRESSIONS';

export const LOAD_CHART_POSTS = 'LOAD_CHART_POSTS';

export const LOAD_CHART_PLAYS = 'LOAD_CHART_PLAYS';

export const LOAD_CHART_USERS = 'LOAD_CHART_USERS';

export const chartsImmersionsEntity = {
  request: (payload) =>
    action(chartImpressionsEntitySchema[REQUEST], { payload }),
  success: (payload, response) =>
    action(chartImpressionsEntitySchema[SUCCESS], { payload, response }),
  failure: (payload, error) =>
    action(chartImpressionsEntitySchema[FAILURE], {
      payload,
      error,
    }),
};

export const chartsPlaysEntity = {
  request: (payload) => action(chartPlaysEntitySchema[REQUEST], { payload }),
  success: (payload, response) =>
    action(chartPlaysEntitySchema[SUCCESS], { payload, response }),
  failure: (payload, error) =>
    action(chartPlaysEntitySchema[FAILURE], {
      payload,
      error,
    }),
};

export const chartsPostsEntity = {
  request: (payload) => action(chartPostsEntitySchema[REQUEST], { payload }),
  success: (payload, response) =>
    action(chartPostsEntitySchema[SUCCESS], { payload, response }),
  failure: (payload, error) =>
    action(chartPostsEntitySchema[FAILURE], {
      payload,
      error,
    }),
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
};

export const loadChartsUsersEntity = (payload) =>
  action(LOAD_CHART_USERS, { payload });

export const loadChartsImpressionsEntity = (payload) =>
  action(LOAD_CHART_IMPRESSIONS, { payload });

export const loadChartsPlaysEntity = (payload) =>
  action(LOAD_CHART_PLAYS, { payload });

export const loadChartsPostsEntity = (payload) =>
  action(LOAD_CHART_POSTS, { payload });
