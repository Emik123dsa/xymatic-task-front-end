import { createSelector } from 'reselect';

export const getError = (state) => state.get('error');

export const getErrors = createSelector(getError, (error) =>
  error.get('errors'),
);
