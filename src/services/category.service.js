const {Category, Post} = require('../db/models');
const getPagingData = require('../utils/getPagingData');
const {Sequelize} = require('sequelize');
/**
 * Create new category
 * @param {object} categoryBody
 * @returns {Promise<Category>}
 */
const createCategory = async categoryBody => {
  return Category.create(categoryBody);
};

/**
 * Query categories with pagination
 * @param {object} filter
 * @param {object} options
 * @returns {object}
 */
const queryCategories = async (page = 1, size = 5) => {
  if (page < 1) throw new Error('Page number cannot be less than 1');

  const categories = await Category.findAndCountAll({
    offset: (page - 1) * size,
    limit: size,
    raw: true,
    attributes: {
      include: [[Sequelize.fn('COUNT', Sequelize.col('posts.id')), 'posts_count']],
    },
    include: [
      {
        model: Post,
        as: 'posts',
        duplicating: false,
        attributes: [],
      },
    ],
    order: [['id', 'DESC']],
    group: ['category.id'],
  });

  return getPagingData(categories, size, page);
};

/**
 * Update category by id (primary key)
 * @param {number} categoryId
 * @param {object} updateBody
 * @returns {Promise<Category>}
 */
const updateCategoryById = async (categoryId, updateBody) => {
  const category = await Category.findByPk(categoryId);
  if (!category) {
    throw new Error('Category not found!');
  }

  return category.update(updateBody);
};

/**
 * Delete category by id (primary key)
 * @param {number} categoryId
 * @returns {Promise<Category>}
 */
const deleteCategoryById = async categoryId => {
  const category = await Category.findByPk(categoryId);
  if (!category) {
    throw new Error('Category not found!');
  }

  return category.destroy();
};

module.exports = {
  createCategory,
  queryCategories,
  updateCategoryById,
  deleteCategoryById,
};
