// import { mergeDeep } from 'apollo-utilities';
import { fromJS, mergeDeep, merge } from 'immutable';
import { SET_ERROR_MESSAGE } from '../actions';

export const initialChartsEntityReducer = fromJS({
  impressions: [],
  users: {},
  plays: {},
  posts: {},
});

export const chartsEntityReducer = (
  state = initialChartsEntityReducer,
  action,
) => {
  switch (action.type) {
    case 'CHART_IMPRESSIONS_SUCCESS':
      return state.updateIn(['impressions'], (schema) =>
        schema.concat(action?.response?.stockPrice),
      );
    default:
      return state;
  }
};
