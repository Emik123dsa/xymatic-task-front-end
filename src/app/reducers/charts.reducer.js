import { fromJS } from 'immutable';
import { SET_ERROR_MESSAGE } from '../actions';

export const initialChartsEntityReducer = fromJS({
  impressions: {},
  users: {},
  plays: {},
  posts: {},
});

export const chartsEntityReducer = (
  state = initialChartsEntityReducer,
  action,
) => {
  if (action?.response) {
    console.log(action.response);
  }

  return state;
};
