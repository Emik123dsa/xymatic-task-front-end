const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const isHMR = process.env.NODE_HMR === 'true';
const PORT = process.env.NODE_PORT || 3000;
const HOST = process.env.NODE_HOST || '0.0.0.0';

const webpack = require('webpack');
const { monitor } = require('./monitor');
const webpackConfig = require('./webpack.config')();

const compiler = webpack(webpackConfig);

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

function createWebpackDevMiddleware() {
  return webpackDevMiddleware(compiler, {
    noInfo: true,
    historyApiFallback: true,
    publicPath: compiler.publicPath,
    hot: true,
    silent: true,
    stats: 'errors-only',
  });
}

function addWebpackHotMiddleWare(app, middleware) {
  app.use(webpackHotMiddleware(compiler));
  const filename = path.join(compiler.outputPath, 'index.html');
  app.get('*', (req, res) => {
    middleware.fileSystem.readFile(filename, (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
}

function addMiddleware(app) {
  const middleware = createWebpackDevMiddleware();
  app.use(middleware);
  addWebpackHotMiddleWare(app, middleware);
}

const app = express();

app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
addMiddleware(app);

app.listen(PORT, HOST, () => {
  monitor(webpackConfig, HOST, PORT);
});
