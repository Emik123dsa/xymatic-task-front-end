import { fromJS } from 'immutable';

export const initialUserReducer = fromJS({
  isAuthenticated: false,
  userCredentials: {},
});

export const userReducer = (state = initialUserReducer, action) => {
  switch (action.type) {
    case 'YOU WILL BURN!':
      return state;
    default:
      return state;
  }
};
