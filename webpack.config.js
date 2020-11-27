const path = require('path');
const { merge } = require('webpack-merge');

const {
  _compilerBrowserOptions,
  _compilerBrowserModule,
  _compilerBrowserPlugins,
} = require('./webpack.config.client');

const isDev = process.env.NODE_ENV === 'development';
const isHMR = process.env.NODE_HMR === 'true';

/**
 * Custom aliases for webpack
 *
 * @returns
 */
const _compilerBrowserResolve = () => {
  return {
    resolve: {
      alias: {
        '@': path.join(process.cwd(), './src/app'),
        '~': path.join(process.cwd(), './src'),
        '@styles': path.join(process.cwd(), './src/assets/styles'),
        '@img': path.join(process.cwd(), './src/assets/img'),
        xymatic: path.join(process.cwd(), 'src/app'),
        'react-dom': '@hot-loader/react-dom',
      },
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.react.js'],
      mainFields: ['browser', 'main', 'jsnext:main'],
    },
  };
};

module.exports = function (env, argv) {
  switch (process.env.NODE_ENV) {
    case 'development':
      return merge(
        _compilerBrowserOptions(isDev),
        _compilerBrowserModule(isDev),
        _compilerBrowserPlugins(isDev),
        _compilerBrowserResolve(),
      );
    case 'production':
      break;
    default:
      throw new Error(`Unhandled Error Exception`);
  }
};
