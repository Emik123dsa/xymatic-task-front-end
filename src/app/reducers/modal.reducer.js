import { fromJS, Map } from 'immutable';
import { Period } from '@/selectors';

export const initialModalReducer = fromJS({
  modalDateSchema: [
    [Period.RealTime],
    [Period.Today],
    [Period.Yesterday],
    [Period.Day],
    [Period.Month],
    [Period.Year],
    [Period.AllTime],
  ],
  modalClientSchema: {
    SettingsModal: false,
    LogoutModal: false,
    ManualModal: false,
  },
});

export const modalReducer = (state = initialModalReducer, action) => {
  if (action && action?.modalCurrent) {
    return state.withMutations((schema) => {
      const prepareSchema = schema.getIn(['modalClientSchema']);
      const preparedSchemaKeys = prepareSchema.keySeq().toArray();

      preparedSchemaKeys.forEach((item) => {
        if (schema.getIn(['modalClientSchema', item])) {
          schema.setIn(['modalClientSchema', item], false);
        }
      });

      return schema.setIn(
        ['modalClientSchema', action?.modalCurrent],
        fromJS(action?.modalState),
      );
    });
  }
  return state;
};
