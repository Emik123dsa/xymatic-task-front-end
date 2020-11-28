/* eslint-disable indent */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer as HotContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { ReduxAsyncConnect } from 'redux-connect';
import { dynamicRoutes } from '@/routes';
import { configureStore } from '@/store';

const initialState = process.env.NODE_SERVER ? window.__INITIAL_DATA__ : {};

const history = process.env.NODE_SERVER
  ? createMemoryHistory({ initialEntries: ['/'] })
  : createBrowserHistory();

const store = configureStore(initialState, history);

if (!process.env.NODE_SERVER) {
  window.store = store;
}

const ROOT = document.getElementById('root');

export const clientProvider = () => (
  <Provider key="provider" store={store}>
    <ConnectedRouter history={history}>
      <ReduxAsyncConnect helpers={{}} routes={dynamicRoutes} />
    </ConnectedRouter>
  </Provider>
);

export const hotClientProvider = () => {
  <HotContainer>
    <Provider key="provider" store={store}>
      <ConnectedRouter history={history}>
        <ReduxAsyncConnect helpers={{}} routes={dynamicRoutes} />
      </ConnectedRouter>
    </Provider>
  </HotContainer>;
};

if (module.hot) {
  module.hot.accept(clientProvider, () => {
    render(hotClientProvider(), ROOT);
  });
}

render(clientProvider(), ROOT);
