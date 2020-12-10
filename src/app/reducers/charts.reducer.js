import { fromJS } from 'immutable';

export const initialChartsEntityReducer = fromJS({
  impressions: [],
  users: [],
  plays: [],
  posts: [],
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
