import { fromJS } from 'immutable';
import { SET_MODAL_IS_OPENED } from '../actions';

export const initialModalReducer = fromJS({
  isModalOpened: false,
  modalDateSchema: [
    ['Today'],
    ['Yesterday'],
    ['1D'],
    ['1M'],
    ['1Y'],
    ['ALL TIME'],
  ],
});

export const modalReducer = (state = initialModalReducer, action) => {
  switch (action.type) {
    case SET_MODAL_IS_OPENED:
      return state.set('isModalOpened', fromJS(action.payload));
    default:
      return state;
  }
};
