'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        email: 'admin@mail.com',
        avatar_path: null,
        password: bcrypt.hashSync('123', bcrypt.genSaltSync(10)),
        role: 'SUPER ADMIN',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Author',
        email: 'author@mail.com',
        avatar_path: null,
        password: bcrypt.hashSync('123', bcrypt.genSaltSync(10)),
        role: 'ADMIN',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
