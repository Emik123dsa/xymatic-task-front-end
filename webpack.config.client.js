/* eslint-disable global-require */
/* eslint-disable indent */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const StylelintPlugin = require('stylelint-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const _HMRSchema = () => [
  'react-hot-loader/patch',
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
];

const _compilerOptimization = () => ({
  splitChunks: {
    cacheGroups: {
      styles: {
        name: 'styles',
        test: /\.css$/,
        chunks: 'all',
        enforce: true,
      },
    },
    chunks: 'all',
  },
});

const _compilerHMREnabled = () => [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new CleanWebpackPlugin(),
];

const _compilerBrowserModule = (isDev) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: ['react-hot-loader/babel', '@loadable/babel-plugin'],
            },
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        sideEffects: true,
      },
      {
        test: /\.(sa|sc)ss$/i,
        use: [
          {
            loader: 'style-loader',
          },
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
                config: path.resolve(process.cwd(), './postcss.config.js'),
              },
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed',
              },
              sourceMap: true,
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                'src/assets/styles/_vars.scss',
                'src/assets/styles/_colors.scss',
              ],
            },
          },
        ],
        include: path.resolve(__dirname, 'src'),
        sideEffects: true,
      },
      {
        test: /\.(png|img|svg|eot|svg|otf|ttf|woff|woff2)$/i,
        use: { loader: 'file-loader' },
      },
      {
        test: /\.(mp4|webm|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      },
      {
        test: /\.html$/i,
        use: 'html-loader',
      },
    ],
  },
});

const _compilerBrowserOptions = (isDev) => ({
  mode: isDev ? 'development' : 'production',
  entry: []
    .concat(isDev ? _HMRSchema() : [])
    .concat([
      'babel-polyfill',
      './src/main.js',
      './src/polyfills.js',
      './src/assets/styles/main.scss',
    ]),

  output: {
    filename: isDev ? '[chunkhash:8].dev.js' : '[contenthash].js',
    chunkFilename: '[id].[chunkhash:8].js',
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  },
  devtool: !isDev ? undefined : 'eval-source-map',
  target: 'web',
  performance: {
    hints: false,
  },
  optimization: _compilerOptimization(),
});

const _compilerBrowserPlugins = (isDev) => ({
  plugins: [
    // new LodashModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MomentLocalesPlugin(),
    new MiniCssExtractPlugin({
      filename: '[chunkhash:8].css',
    }),
    new WebpackBar(),
    // new StylelintPlugin({
    //   // configFile: path.join(process.cwd(), '.stylelintrc.json'),
    // }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/img', to: 'img' },
        { from: 'static/favicon.ico', to: 'public' },
        { from: 'src/serviceWorker.js', to: '.' },
      ],
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      template: 'static/index.html',
      filename: 'public/index.html',
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
  ].concat(
    isDev
      ? _compilerHMREnabled()
      : [
          new TerserPlugin(),
          new webpack.optimize.ModuleConcatenationPlugin(),
          new BundleAnalyzerPlugin(),
        ],
  ),
});

module.exports = {
  _compilerBrowserModule,
  _compilerBrowserOptions,
  _compilerBrowserPlugins,
};
