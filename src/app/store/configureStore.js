/* eslint-disable implicit-arrow-linebreak */
/* eslint-enable implicit-arrow-linebreak */
import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';
import { namedReducerEnhancer } from 'redux-named-reducers';
import createSagaMiddleware, { END } from 'redux-saga';
import { routerMiddleware } from 'connected-react-router/immutable';
import sagaMonitor from '@redux-saga/simple-saga-monitor';
import { createRootReducer } from '@/reducers/reducers';
import { createLogger } from 'redux-logger';
import { createBrowserHistory, createMemoryHistory } from 'history';

export const history = !process.env.NODE_SERVER
  ? createBrowserHistory()
  : createMemoryHistory({ initialEntries: ['/'] });

export const configureStore = (initialState = {}) => {
  const sagaMiddleWare = createSagaMiddleware({ sagaMonitor });

  const middlewares = [thunk, routerMiddleware(history), sagaMiddleWare].concat(
    process.env.NODE_ENV === 'development' ? [createLogger()] : [],
  );

  const enhancers = [applyMiddleware(...middlewares)];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: true })
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
    // eslint-disable-next-line global-require
    module.hot.accept(require('../reducers/reducers'), () => {
      store.replaceReducer(createRootReducer(store.injectedReducers));
    });
  }

  return store;
};
