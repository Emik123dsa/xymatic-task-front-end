import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { connectRouter } from 'connected-react-router/immutable';

import {
  immutableReducer as reduxAsyncConnect,
  setToImmutableStateFunc,
  setToMutableStateFunc,
} from 'redux-connect';
import { userReducer } from './user.reducer';

setToImmutableStateFunc((mutableState) => fromJS(mutableState));
setToMutableStateFunc((immutableState) => immutableState.toJS());

export const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    reduxAsyncConnect,
  });
