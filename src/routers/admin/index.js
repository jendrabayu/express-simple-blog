const express = require('express');
const router = express.Router();
const authRoute = require('./auth.route');
const categoryRoute = require('./category.route');

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/categories',
    route: categoryRoute,
  },
];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

module.exports = router;
