import { fromJS } from 'immutable';

export const initialSidebarReducer = fromJS({
  sidebarFeatures: [
    'Dashboard',
    'Impressions',
    'Plays',
    'Posts',
    'Users',
    'Analytics',
  ],
  sidebarActions: ['Settings', 'Logout'],
});

export const sidebarReducer = (state = initialSidebarReducer, action) => state;
