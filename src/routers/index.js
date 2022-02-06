const express = require('express');
const {dashboardController} = require('../controllers/admin');

const router = express.Router();

router.get('/', dashboardController.viewIndex);

module.exports = router;
