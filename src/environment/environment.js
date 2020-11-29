/* eslint-disable global-require */

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./environment.prod');
} else {
  module.exports = require('./environment.hmr');
}
