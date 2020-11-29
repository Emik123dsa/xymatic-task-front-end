import { fromJS } from 'immutable';

export const initialUserReducer = fromJS({
  isAuthenticated: false,
  currentUserSchema: {},
});

export const userReducer = (state = initialUserReducer, action) => state;
