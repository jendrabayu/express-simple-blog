const express = require('express');
const router = express.Router();
const {authController} = require('../../controllers/admin');
const auth = require('../../middlewares/auth');

router.route('/login').get(authController.viewLogin).post(authController.login);
router.get('/logout', auth(), authController.logout);

module.exports = router;
