import { fromJS } from 'immutable';

const initialActionsReducer = fromJS({
  posts: [],
  users: [],
  notifcations: [],
});

export const actionsReducer = (state = initialActionsReducer, action) => state;
