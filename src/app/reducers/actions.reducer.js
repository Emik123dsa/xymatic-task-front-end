import { fromJS } from 'immutable';

const initialActionsReducer = fromJS({
  triggers: [],
});

export const actionsReducer = (state = initialActionsReducer, action) => state;
