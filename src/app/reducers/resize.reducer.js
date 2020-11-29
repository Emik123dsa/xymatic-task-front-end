import { fromJS } from 'immutable';
import { SET_IS_MOBILE } from '../actions';

export const initialResizeReducer = fromJS({
  isMobile: false,
});

export const resizeReducer = (state = initialResizeReducer, action) => {
  switch (action.type) {
    case SET_IS_MOBILE:
      return state.set('isMobile', fromJS(action.payload));
    default:
      return state;
  }
};
