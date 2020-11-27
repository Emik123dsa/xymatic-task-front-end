import { fromJS } from 'immutable';

export const initialSidebarReducer = fromJS({
  sidebarFeatures: ['Dashboard', 'Orders', 'Tracking', 'Revenue'],
  sidebarActions: ['Settings', 'Logout'],
});

export const sidebarReducer = (state = initialSidebarReducer, action) => state;
