import { fromJS } from 'immutable';
import { SET_ERROR_MESSAGE } from '../actions';

export const initialErrorReducer = fromJS({
  errorMessage: {},
});

export const errorReducer = (state = initialErrorReducer, action) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return state.set('errorMessage', fromJS(action.payload));
    default:
      return state;
  }
};
