import { fromJS } from 'immutable';

export const initialUserReducer = fromJS({
  isAuthenticated: false,
  userCredentials: {},
});

export const userReducer = (state = initialUserReducer, action) => state;
