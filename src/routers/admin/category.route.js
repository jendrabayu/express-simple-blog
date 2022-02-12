const express = require('express');
const router = express.Router();
const {categoryController} = require('../../controllers/admin');
const auth = require('../../middlewares/auth');

router
  .route('/')
  .get(auth(), categoryController.viewCategory)
  .post(auth(), categoryController.storeCategory);

router
  .route('/:id')
  .put(auth(), categoryController.updateCategory)
  .delete(auth(), categoryController.deleteCategory);

module.exports = router;
