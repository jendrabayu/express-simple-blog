const httpStatus = require('http-status');
const {tokenService} = require('../services');

const auth =
  (role = '') =>
  (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
      res.redirect('/auth/login');
    } else {
      try {
        const user = tokenService.verifyToken(token);
        res.locals.user = user;

        if (role && role !== user.role) {
          return res.status(httpStatus.FORBIDDEN).render('error', {
            message: httpStatus[httpStatus.FORBIDDEN],
            error: {
              status: httpStatus.FORBIDDEN,
              stack: '',
            },
          });
        } else {
          next();
        }
      } catch (error) {
        res.clearCookie('token').redirect('/auth/login');
      }
    }
  };

module.exports = auth;
