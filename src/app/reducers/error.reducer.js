import { fromJS } from 'immutable';
import { SET_ERROR_MESSAGE, RESET_ERROR_MESSAGE } from '../actions';
import { GRAPHQL_UNHANDLER_ERROR } from '../shared/helpers/messages';

export const initialErrorReducer = fromJS({
  errors: [],
});

export const errorReducer = (state = initialErrorReducer, action) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return state.setIn(
        ['errors'],
        fromJS(action?.payload || [GRAPHQL_UNHANDLER_ERROR]),
      );
    case RESET_ERROR_MESSAGE:
      return state.setIn(['errors'], fromJS(action?.payload || []));
    default:
      return state;
  }
};
