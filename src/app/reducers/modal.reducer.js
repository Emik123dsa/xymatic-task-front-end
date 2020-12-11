import { fromJS } from 'immutable';
import { SET_MODAL_CURRENT_DATE_SCHEMA, SET_MODAL_IS_OPENED } from '../actions';

export const initialModalReducer = fromJS({
  isModalOpened: false,
  modalCurrentDateSchema: ['Real Time'],
  modalDateSchema: [
    ['Real Time'],
    ['Today'],
    ['Yesterday'],
    ['Day'],
    ['Month'],
    ['Year'],
    ['All time'],
  ],
});

export const modalReducer = (state = initialModalReducer, action) => {
  switch (action.type) {
    case SET_MODAL_IS_OPENED:
      return state.set('isModalOpened', fromJS(action.payload));
    case SET_MODAL_CURRENT_DATE_SCHEMA:
      return state.setIn(['modalCurrentDateSchema', 0], fromJS(action.payload));
    default:
      return state;
  }
};
