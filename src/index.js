const app = require('./app');
const config = require('./config/config');

app.listen(config.port, () => {
  console.info(`Server is running on port ${config.port}`);
});
