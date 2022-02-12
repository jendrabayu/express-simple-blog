const express = require('express');
const router = express.Router();
const {tagController} = require('../../controllers/admin');
const auth = require('../../middlewares/auth');

router.route('/').get(auth(), tagController.viewTag).post(auth(), tagController.storeTag);

router.route('/:id').put(auth(), tagController.updateTag).delete(auth(), tagController.deleteTag);

module.exports = router;
