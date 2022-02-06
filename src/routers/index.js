const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).send('<h1>Hello World</h1>');
});

module.exports = router;
