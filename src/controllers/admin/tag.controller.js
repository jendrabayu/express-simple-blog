const catchAsync = require('../../utils/catchAsync');
const {tagService} = require('../../services');
const slug = require('../../utils/slug');

const viewTag = catchAsync(async (req, res) => {
  const {page} = req.query;
  const tags = await tagService.queryTags(page);
  res.render('tag/index', {
    tags,
  });
});

const storeTag = catchAsync(async (req, res) => {
  const {name} = req.body;
  try {
    await tagService.createTag({
      name,
      slug: slug(name),
    });
    req.flash('alerts', {
      success: 'Berhasil menambahkan tag',
    });
  } catch (error) {
    req.flash('alerts', {
      error: error.message,
    });
  }
  res.redirect('back');
});
const updateTag = catchAsync(async (req, res) => {
  const {name} = req.body;
  const {id} = req.params;
  try {
    await tagService.updateTagById(id, {
      name,
      slug: slug(name),
    });
    req.flash('alerts', {
      success: 'Tag berhasil diperbarui',
    });
  } catch (error) {
    req.flash('alerts', {
      error: error.message,
    });
  }
  res.redirect('back');
});
const deleteTag = catchAsync(async (req, res) => {
  const {id} = req.params;
  try {
    await tagService.deleteTagById(id);
    req.flash('alerts', {
      success: 'Tag berhasil dihapus',
    });
  } catch (error) {
    req.flash('alerts', {
      error: error.message,
    });
  }
  res.redirect('back');
});

module.exports = {
  viewTag,
  storeTag,
  updateTag,
  deleteTag,
};
