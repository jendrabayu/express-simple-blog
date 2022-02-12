const {Tag, Post} = require('../db/models');
const getPagingData = require('../utils/getPagingData');
const {Sequelize} = require('sequelize');

/**
 * Create new tag
 * @param {object} tagBody
 * @returns {Promise<Tag>}
 */
const createTag = async tagBody => {
  return Tag.create(tagBody);
};

/**
 * Query tag with pagination
 * @param {number} page
 * @param {number} size
 * @returns {object}
 */
const queryTags = async (page = 1, size = 5) => {
  if (page < 1) throw new Error('Page number cannot be less than 1');

  const tags = await Tag.findAndCountAll({
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
    group: ['tag.id'],
  });

  return getPagingData(tags, size, page);
};

/**
 * Update Tag by id (primary key)
 * @param {number} tagId
 * @param {object} updateBody
 * @returns {Promise<Tag>}
 */
const updateTagById = async (tagId, updateBody) => {
  const tag = await Tag.findByPk(tagId);
  if (!tag) {
    throw new Error('Tag not found!');
  }

  return tag.update(updateBody);
};

/**
 * Delete Tag by id (primary key)
 * @param {number} tagId
 * @returns {Promise<Tag>}
 */
const deleteTagById = async tagId => {
  const tag = await Tag.findByPk(tagId);
  if (!tag) {
    throw new Error('Tag not found!');
  }

  return tag.destroy();
};

module.exports = {
  createTag,
  queryTags,
  updateTagById,
  deleteTagById,
};
