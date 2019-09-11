// *** main dependencies *** //
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var swig = require('swig');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var compress = require('compression');
var methodOverride = require('method-override');
var cors = require('cors');
var httpStatus = require('http-status');
var expressWinston = require('express-winston');
var expressValidation = require('express-validation');
var helmet = require('helmet');
var winstonInstance = require('winston');
var routes = require('./routes/index');
var config = require('./config/config');
var APIError = require('./helpers/APIError');
var path = require('path');
var url = require('url');

// *** express instance *** //
const app = express();

// *** mongoose *** //
mongoose.connect(config.database.local);

// *** view engine *** //
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

// *** static directory *** //
app.set('views', path.join(__dirname, 'views'));

// *** config middleware *** //
if (app.get('env') === 'development') {
    app.use(logger('dev'));
}
app.use(bodyParser.json()); // parse body params and attache them to req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(methodOverride());
app.use(helmet()); // secure apps by setting various HTTP headers
app.use(cors()); // enable CORS - Cross Origin Resource Sharing
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(session({
    secret: config.session.secret,
    clear_interval: 900,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: true,
    rolling : true
}));
app.use(passport.initialize());
app.use(passport.session());

// *** main routes *** //
app.use('/', routes);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
        // validation error contains errors which is an array of error each containing message[]
        const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
        const error = new APIError(unifiedErrorMessage, err.status, true);
        return next(error);
    } else if (!(err instanceof APIError)) {
        const apiError = new APIError(err.message, err.status, err.isPublic);
        return next(apiError);
    }
    return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new APIError('Not found', httpStatus.NOT_FOUND);
    return next(err);
});

// log error in winston transports except when executing test suite
if (app.get('env') !== 'test') {
    app.use(expressWinston.errorLogger({
        winstonInstance
    }));
}

console.log('test');

// *** error handlers *** //

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {// eslint-disable-line no-unused-vars
    var path = url.parse(req.url).pathname;
    if(path.indexOf("api") >= 1) {
        res.status(err.status).json({
            code: err.status,
            msg: err.isPublic ? err.message : httpStatus[err.status],
            stack: app.get('env') === 'development' ? err.stack : {}
        });
    } else {
        res.status(err.status).render('error', {
            title: err.status + " " + err.message,
            message: err.message,
            error: err,
            stack: app.get('env') === 'development' ? err.stack : {}
        });
    }
});

module.exports = app;
