import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { connectRouter } from 'connected-react-router/immutable';

import {
  immutableReducer as reduxAsyncConnect,
  setToImmutableStateFunc,
  setToMutableStateFunc,
} from 'redux-connect';
import { userReducer, sidebarReducer, resizeReducer } from '.';
import { errorReducer } from './error.reducer';
import { chartsEntityReducer } from './charts.reducer';
import { apolloClient } from '~/apolloConfig';

setToImmutableStateFunc((mutableState) => fromJS(mutableState));
setToMutableStateFunc((immutableState) => immutableState.toJS());

export const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    sidebar: sidebarReducer,
    resize: resizeReducer,
    chartsEntity: chartsEntityReducer,
    error: errorReducer,
    reduxAsyncConnect,
  });
