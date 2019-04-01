
const createError = require('http-errors');
const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
// TODO: Rename to /routes/api/store
const storeRouter = require('./routes/store');
// TODO: Rename to /routes/api/session
const sessionRouter = require('./routes/session');
// TODO: Rename to /routes/api/users
const usersRouter = require('./routes/users');
const app = express();

// Enforce HSTS (HTTP strict transport security)
const hsts = require('hsts')
app.use(hsts({
  maxAge: 63072000, // 180 days in seconds
  includeSubDomains: true,
  preload: true
}))

// Enforce SSL (HTTPS)
const enforce = require('express-sslify');
app.use(enforce.HTTPS({ trustProtoHeader: true }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Index
app.use('/', indexRouter);

// Web api store
app.use('/api/store', storeRouter);

// app.use(basicAuth({
//     users: { 'exile': 'test123' }
// }))
app.use('/api/session', sessionRouter);
app.use('/api/users', usersRouter);

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

module.exports = app;
