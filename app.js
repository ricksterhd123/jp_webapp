// Set to true when testing locally, because SSL is enforced
var DEBUG_MODE = true;

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
// TODO: Rename to /routes/api/store
const storeRouter = require('./routes/store/store');
// TODO: Rename to /routes/api/session
const sessionRouter = require('./routes/session');
// TODO: Rename to /routes/api/users
const usersRouter = require('./routes/users');
const registerRouter = require('./routes/register');
const storeGamesRouter = require('./routes/store/games');

const app = express();

if (!DEBUG_MODE) {
    // Enforce HSTS (HTTP strict transport security)
    const hsts = require('hsts')
    app.use(hsts({
        maxAge: 63072000, // 180 days in seconds
        includeSubDomains: true,
        preload: true
    }));

    // Enforce SSL (HTTPS)
    const enforce = require('express-sslify');
    app.use(enforce.HTTPS({
        trustProtoHeader: true
    }));

    // ensure that all headers are provided:
    const helmet = require('helmet');
    app.use(helmet());

    console.log("Still executes");
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Index
app.use('/', indexRouter);
// Web api store
app.use('/api/store', storeRouter);
app.use('/api/session', sessionRouter);
app.use('/api/users', usersRouter);
app.use('/register', registerRouter);
app.use('/api/store/games', storeGamesRouter);

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
