/* eslint-disable prefer-template */

const { Config } = require('./config');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register(Config.serviceWorker, { scope: './' })
    .then((reg) => {
      if (!window.API_BASE_URL) window.API_BASE_URL = Config.GRAPHQL_API_ROOT;

      console.log('Registration succeeded. Scope is ' + reg.scope);
    })
    .catch((error) => {
      console.log('Registration failed with ' + error);
    });
}
