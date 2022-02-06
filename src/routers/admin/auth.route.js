const express = require('express');
const router = express.Router();
const {authController} = require('../../controllers/admin');

router.get('/login', authController.viewLogin);

module.exports = router;
