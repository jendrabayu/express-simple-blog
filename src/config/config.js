const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path: path.join(__dirname, '../../.env')});

module.exports = {
  env: process.env.NODE_ENV,
  app_name: process.env.APP_NAME,
  port: process.env.PORT,
};
