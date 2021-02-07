import { createSelector } from 'reselect';

export const getPaginationEntity = (state) => state.get('paginationEntity');

/// /////////////////////////////////////////////////
// Users Entity
/// ////////////////////////////////////////////////
export const getUserPaginationVariable = createSelector(
  getPaginationEntity,
  (schema) => schema.getIn(['users', 'variables']),
);
export const getUserPaginationData = createSelector(
  getPaginationEntity,
  (schema) => schema.getIn(['users', 'data']),
);

/// /////////////////////////////////////////////////
// Impressions Entity
/// ////////////////////////////////////////////////
export const getImpressionPaginationVariable = createSelector(
  getPaginationEntity,
  (schema) => schema.getIn(['impressions', 'variables']),
);
export const getImpressionPaginationData = createSelector(
  getPaginationEntity,
  (schema) => schema.getIn(['impressions', 'data']),
);

/// /////////////////////////////////////////////////
// Plays Entity
/// ////////////////////////////////////////////////
export const getPlayPaginationVariable = createSelector(
  getPaginationEntity,
  (schema) => schema.getIn(['plays', 'variables']),
);
export const getPlayPaginationData = createSelector(
  getPaginationEntity,
  (schema) => schema.getIn(['plays', 'data']),
);

/// /////////////////////////////////////////////////
// Posts Entity
/// ////////////////////////////////////////////////
export const getPostPaginationVariable = createSelector(
  getPaginationEntity,
  (schema) => schema.getIn(['posts', 'variables']),
);
export const getPostPaginationData = createSelector(
  getPaginationEntity,
  (schema) => schema.getIn(['posts', 'data']),
);
