'use strict';

const slug = require('../../utils/slug');

module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = [
      'Quick and Easy',
      'Vegan',
      'Pasta',
      'Soups',
      'Instant Pot',
      'Vegetarian',
      'Tacos',
      'Salads',
      'Meal Prep',
      'Sugar-Free',
      'Bowls',
      'Dinner',
    ].map(name => ({
      name,
      slug: slug(name),
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert('categories', categories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
