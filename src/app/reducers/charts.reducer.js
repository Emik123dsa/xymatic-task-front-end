import { fromJS } from 'immutable';
import { CHART_LENGTH_RESTRICTION } from '../selectors';

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
  if (action && action?.clean) {
    return state.setIn([action.clean], fromJS([]));
  }

  if (action && action?.success) {
    const type = Reflect.ownKeys(action?.success);
    if (type && type[0].match(/(S|s+)ubscribe$/gim)) {
      if (state.getIn([action.payload]).size > CHART_LENGTH_RESTRICTION - 6) {
        return state.setIn(
          [action.payload],
          state.get(action.payload).slice(1),
        );
      }

      return state.updateIn([action.payload], (schema) =>
        fromJS(schema.concat(action?.success[type])),
      );
    }

    return state.updateIn([action.payload], (schema) =>
      fromJS(action?.success[type]),
    );
  }

  return state;
};
