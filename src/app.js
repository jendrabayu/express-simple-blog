const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const createError = require('http-errors');
const httpStatus = require('http-status');
const routes = require('./routers');
const adminRoutes = require('./routers/admin');
const config = require('./config/config');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// override with the _method header in the request
app.use(methodOverride('_method'));

// trust first proxy
app.set('trust proxy', 1);

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({extended: true}));

// parse cookie
app.use(cookieParser());

// set security HTTP headers
app.use(helmet());

// logger
if (config.env === 'development') {
  app.use(morgan('dev'));
}

// enable cors
app.use(cors());

// set static file
app.use(express.static(path.join(__dirname, '../public')));
app.use('/sbadmin', express.static(path.join(__dirname, '../public/sbadmin')));

// testing middleware
app.use((req, res, next) => {
  console.log('this is a middleware');
  next();
});

// routes
app.use('/', routes);
app.use('/', adminRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(httpStatus.NOT_FOUND));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);

  res.render('error');
});

module.exports = app;
