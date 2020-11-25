import { fromJS } from 'immutable';

export const initialUserReducer = fromJS({
  currentUser: '',
});

export const userReducer = (state = initialUserReducer, action) => state;
