import { fromJS, Map } from 'immutable';
import { getState } from 'redux-named-reducers';
import { Period } from '@/selectors';
import { isNil } from 'lodash';
import { chartConfig } from '~/chart.config';
import { resizeReducer } from './resize.reducer';

const initialChartEntity = fromJS({
  EVENT_CHANNEL: null,
  CURRENT_DATE_SCHEMA: [Period.AllTime],
  data: [],
});

export const initialChartsEntityReducer = fromJS({
  impressions: initialChartEntity,
  users: initialChartEntity,
  plays: initialChartEntity,
  posts: initialChartEntity,
  chartRowsAmount: [],
});

export const chartsEntityReducer = (
  state = initialChartsEntityReducer,
  action,
) => {
  if (action && action?.rows) {
    return state.withMutations((schema) =>
      schema.setIn(
        ['chartRowsAmount'],
        fromJS(action?.rows?.countAllRows || {}),
      ),
    );
  }

  if (action && action?.current) {
    return state.setIn(
      [action.chart, 'CURRENT_DATE_SCHEMA'],
      fromJS([action?.current]),
    );
  }

  if (action && action?.mode) {
    return state.withMutations((schema) => {
      const schemaEntites = schema.keySeq().toArray();
      schemaEntites.forEach((item) => {
        if (Map.isMap(schema.get(item))) {
          if (action?.mode.startsWith('ALL')) {
            if (!isNil(state.getIn([item, 'EVENT_CHANNEL']))) {
              state.getIn([item, 'EVENT_CHANNEL'])?.close();
            }
            return schema
              .setIn([item, 'CURRENT_DATE_SCHEMA'], fromJS([Period.AllTime]))
              .setIn([item, 'data'], fromJS([]))
              .setIn([item, 'EVENT_CHANNEL'], fromJS(null));
          }
          return schema;
        }
        return schema;
      });
    });
  }

  if (action && action?.clean) {
    return state.setIn([action.clean, 'data'], fromJS([]));
  }

  if (action && action?.close) {
    return state.setIn([action.close, 'EVENT_CHANNEL'], fromJS(null));
  }

  if (action && action?.channel) {
    return state.withMutations((schema) =>
      schema.setIn([action?.schema, 'EVENT_CHANNEL'], action?.channel),
    );
  }

  if (action && action?.success) {
    const type = Reflect.ownKeys(action?.success);
    if (type && type[0].match(/(S|s+)ubscribe$/gim)) {
      return state.withMutations((schema) => {
        if (
          schema.getIn([action.payload, 'data']).size <
          chartConfig.maxLength / 2
        ) {
          return schema.updateIn([action.payload, 'data'], (actionSchema) =>
            fromJS(actionSchema.concat(action?.success[type])),
          );
        }

        return schema
          .deleteIn([action.payload, 'data', 0])
          .updateIn([action.payload, 'data'], (actionSchema) =>
            fromJS(actionSchema.concat(action?.success[type])),
          );
      });
    }

    return state.updateIn([action.payload, 'data'], (schema) =>
      fromJS(action?.success[type]),
    );
  }

  return state;
};
