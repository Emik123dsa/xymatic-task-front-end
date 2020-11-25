/* eslint-disable implicit-arrow-linebreak */
/* eslint-enable implicit-arrow-linebreak */
import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';
import createSagaMiddleware, { END } from 'redux-saga';
import { routerMiddleware } from 'connected-react-router/immutable';

import { createRootReducer } from '../reducers';

export const configureStore = (initialState = {}, history) => {
  const sagaMiddleWare = createSagaMiddleware();

  const middlewares = [thunk, routerMiddleware(history), sagaMiddleWare];

  const enhancers = [applyMiddleware(...middlewares)];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: false })
      : compose;

  const store = createStore(
    createRootReducer(history),
    fromJS(initialState),
    composeEnhancers(...enhancers),
  );

  store.runSaga = sagaMiddleWare.run;
  store.close = () => store.dispatch(END);

  store.injectedReducers = {};

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(createRootReducer(store.injectedReducers));
    });
  }

  return store;
};
