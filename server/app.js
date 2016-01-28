import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import historyApiFallback from 'connect-history-api-fallback';
import commands from './routes/commands';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/commands', commands);

app.use(historyApiFallback({
  verbose: false
}));

if (app.get('env') === 'development') {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config');
  const webpackMiddleware = require('webpack-dev-middleware');

  app.use(express.static(path.join(__dirname, '../dist')));
  app.use(webpackMiddleware(webpack(webpackConfig)));
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    if (err.status !== 404) {
      console.error(err.stack);
    }

    next(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message
  });
});

export default app;
