import { createSelector } from 'reselect';

export const getRouter = (state) => state.get('router');

export const getRouterLocation = createSelector(getRouter, (route) =>
  route.get('location'),
);
