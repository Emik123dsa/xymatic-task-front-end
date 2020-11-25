const path = require('path');
const webpack = require('webpack');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isHMR = process.env.NODE_HMR === 'true';

const compilerModule = () => {
  return {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/i,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                plugins: ['react-hot-loader/babel'],
              },
            },
            {
              loader: 'eslint-loader',
            },
          ],
        },
        {
          test: /\.(c|sc|sa)ss$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: isDev
                    ? '[name]_[local]_[hash:base64:5]'
                    : '[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: path.resolve(process.cwd(), 'postcss.config.js'),
                },
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  data:
                    '@import "./src/assets/styles/_vars.scss"; @import "./src/assets/styles/_colors.scss"',
                  includePaths: [__dirname, 'src'],
                },
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(eot|svg|otf|ttf|woff|woff2|png)$/i,
          use: 'base64-inline-loader',
        },
        {
          test: /\.(mp4|webm|gif)$/i,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        },
        {
          test: /\.(html|html)$/i,
          use: 'html-loader',
        },
      ],
    },
  };
};

const compilerResolve = () => {
  return {
    resolve: {
      alias: {
        '@': path.resolve('src'),
        'react-dom': '@hot-loader/react-dom',
      },
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.react.js'],
      mainFields: ['browser', 'main', 'jsnext:main'],
    },
  };
};

const compilerOptions = () => {
  return {
    mode: 'development',
    entry: {
      main: [
        './src/main.js',
        './src/polyfills.js',
        './src/assets/styles/main.scss',
        'react-hot-loader',
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      ],
    },
    output: {
      filename: isDev ? '[name].dev.js' : '[hash:64].js',
      chunkFilename: isDev ? '[name].dev.js' : '[hash:64].js',
      path: path.resolve(process.cwd(), 'build'),
      publicPath: '/',
    },
    devtool: 'eval-source-map',
    target: 'web',
    performance: {
      hints: false,
    },
  };
};

const compilerPlugins = () => {
  switch (isDev) {
    case true:
      return {
        plugins: [
          new ProgressBarWebpackPlugin(),
          new StylelintPlugin({
            configFile: path.join(process.cwd(), '.stylelintrc.json'),
          }),
          new CopyWebpackPlugin({
            patterns: [
              { from: 'src/assets/img', to: 'img' },
              { from: 'static/**', to: '.' },
            ],
          }),
          new HtmlWebpackPlugin({
            template: 'static/index.html',
            filename: 'index.html',
            inject: true,
          }),

          new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: false,
          }),
          new webpack.ProvidePlugin({
            Promise: 'bluebird',
          }),
          new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
          }),
          new CleanWebpackPlugin(),
          new webpack.NoEmitOnErrorsPlugin(),
          new webpack.HotModuleReplacementPlugin(),
        ],
      };
    case false:

    default:
      throw new Error(`Unhandled Error Rejection`);
  }
};

module.exports = function (env, argv) {
  switch (process.env.NODE_ENV) {
    case 'development':
      return merge(
        compilerOptions(),
        compilerModule(),
        compilerPlugins(),
        compilerResolve(),
      );
    case 'production':
      break;
    default:
      throw new Error(`Unhandled Error Exception`);
  }
};
