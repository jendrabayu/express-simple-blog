const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const httpStatus = require('http-status');
const routes = require('./routers');
const adminRoutes = require('./routers/admin');
const config = require('./config/config');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./docs/apidoc.json');
const errorHandler = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// override with the _method header in the request
app.use(methodOverride('_method'));

// trust first proxy
app.set('trust proxy', 1);
// session
app.use(
  session({
    secret: 'rahasia',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 3600000},
  })
);

app.use(flash());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({extended: true}));

// parse cookie
app.use(cookieParser());

// set security HTTP headers
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'img-src': ["'self'", 'https: data:'],
    },
  })
);

// logger
if (config.env === 'development') {
  app.use(morgan('dev'));
}

// enable cors
app.use(cors());
app.options('*', cors());

// set static file
app.use(express.static(path.join(__dirname, '../public')));
app.use('/sbadmin', express.static(path.join(__dirname, '../public/sbadmin')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(function (req, res, next) {
  //https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
  res.header('Cross-Origin-Embedder-Policy', 'unsafe-none');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  const alerts = req.flash('alerts');
  res.locals.alerts = alerts.length > 0 ? alerts[0] : {};

  next();
});

// routes
app.use('/', routes);
app.use('/', adminRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND]));
});

// error handler
app.use(errorHandler);

module.exports = app;
