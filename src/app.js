import createError from 'http-errors';
import express, { json, urlencoded, static as exStatic } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sassMiddleware from 'node-sass-middleware';

import indexRouter from './routes/index';
import configRouter from './routes/config';
import environmentRouter from './routes/environment';
import mockRouter from './routes/mock';

var app = express();

// view engine setup
app.set('views', join(__dirname, '../src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: join(__dirname, 'public'),
  dest: join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(exStatic(join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/configs', configRouter);
app.use('/environment', environmentRouter);
app.use('/mock', mockRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
