/* eslint-disable indent */

import React, { Fragment } from 'react';
import Modal from 'react-modal';
import { Router } from 'react-router';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { AppContainer as HotContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import {
  createBrowserHistory,
  createMemoryHistory,
  createHashHistory,
} from 'history';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { ReduxAsyncConnect } from 'redux-connect';
import { dynamicRoutes } from '@/routes';
import { configureStore, history } from '@/store';
import { rootSaga } from '@/sagas';
import { ApolloProvider } from 'react-apollo';
import { client } from './apollo.config';

const initialState = !process.env.NODE_SERVER ? window.__INITIAL_STATE__ : {};

const store = configureStore(initialState);

store.runSaga(rootSaga);

if (!process.env.NODE_SERVER) {
  window.store = store;
}

const ROOT = document.getElementById('root');

Modal.setAppElement('#root');

@hot
class Bootstrap extends React.Component {
  render() {
    return (
      <Provider key="provider" store={store}>
        <ApolloProvider client={client()}>
          <ConnectedRouter history={history}>
            <Fragment>
              <ReduxAsyncConnect helpers={{}} routes={dynamicRoutes} />
            </Fragment>
          </ConnectedRouter>
        </ApolloProvider>
      </Provider>
    );
  }
}

export const clientRender = (Component) =>
  render(
    <HotContainer>
      <Component />
    </HotContainer>,
    ROOT,
  );

clientRender(Bootstrap);

if (module.hot) {
  module.hot.accept();
}
