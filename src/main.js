/* eslint-disable indent */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer as HotContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { ReduxAsyncConnect } from 'redux-connect';
import { ContainerRoutes } from '@/routes';
import { configureStore } from '@/store';

const initialState = process.env.NODE_SERVER ? window.__INITIAL_DATA__ : {};

const history = process.env.NODE_SERVER
  ? createMemoryHistory({ initialEntries: ['/'] })
  : createBrowserHistory();

const store = configureStore(initialState, history);

if (!process.env.NODE_SERVER) {
  window.store = store;
}

export const clientRender = () => {
  render(
    <HotContainer>
      <Provider key="provider" store={store}>
        <ConnectedRouter history={history}>
          <ReduxAsyncConnect helpers={{}} routes={ContainerRoutes} />
        </ConnectedRouter>
      </Provider>
    </HotContainer>,
    document.getElementById('root'),
  );

  if (module.hot) {
    module.hot.accept();
  }
};

clientRender();
