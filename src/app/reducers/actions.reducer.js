import { fromJS } from 'immutable';

const initialActionsReducer = fromJS({
  posts: [],
  users: [],
  notifcations: [],
});
Notification
export const actionsReducer = (state = initialActionsReducer, action) => state;
