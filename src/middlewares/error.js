const httpStatus = require('http-status');
const config = require('../config/config');

const errorHandler = (err, req, res, next) => {
  let {status, message} = err;

  if (config.env === 'development' && !err.isOperational) {
    status = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.message = err.message;
  res.locals.error = config.env === 'development' ? err : {};

  if (req.xhr) {
    res.status(status).json({
      code: status,
      message,
      ...(config.env === 'development' && {stack: err.stack}),
    });
  } else {
    res.render('error');
  }
};

module.exports = errorHandler;
