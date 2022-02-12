const catchAsync = require('../../utils/catchAsync');
const {categoryService} = require('../../services');
const slug = require('../../utils/slug');

const viewCategory = catchAsync(async (req, res) => {
  const {page} = req.query;
  const categories = await categoryService.queryCategories(page);
  res.render('category/index', {
    categories,
  });
});

const storeCategory = catchAsync(async (req, res) => {
  const {name} = req.body;
  try {
    await categoryService.createCategory({
      name,
      slug: slug(name),
    });
    req.flash('alerts', {
      success: 'Berhasil menambahkan kategori',
    });
  } catch (error) {
    req.flash('alerts', {
      error: error.message,
    });
  }
  res.redirect('back');
});
const updateCategory = catchAsync(async (req, res) => {
  const {name} = req.body;
  const {id} = req.params;
  try {
    await categoryService.updateCategoryById(id, {
      name,
      slug: slug(name),
    });
    req.flash('alerts', {
      success: 'Kategori berhasil diperbarui',
    });
  } catch (error) {
    req.flash('alerts', {
      error: error.message,
    });
  }
  res.redirect('back');
});
const deleteCategory = catchAsync(async (req, res) => {
  const {id} = req.params;
  try {
    await categoryService.deleteCategoryById(id);
    req.flash('alerts', {
      success: 'Kategori berhasil dihapus',
    });
  } catch (error) {
    req.flash('alerts', {
      error: error.message,
    });
  }
  res.redirect('back');
});

module.exports = {
  viewCategory,
  storeCategory,
  updateCategory,
  deleteCategory,
};
