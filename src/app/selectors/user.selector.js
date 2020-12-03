import { createSelector } from 'reselect';

export const getUser = (state) => state.get('user');

export const getUserAuthenticated = createSelector(getUser, (user) =>
  user.get('isAuthenticated'),
);

export const getUserCredentials = createSelector(getUser, (user) =>
  user.get('userCredentials'),
);
