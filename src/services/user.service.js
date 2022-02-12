const {User} = require('../db/models');
const {Op} = require('sequelize');

/**
 * Get user by email
 * @param {string} email
 * @param {boolean} isRaw
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email, isRaw = true) => {
  return User.findOne({
    raw: isRaw,
    where: {
      email: {
        [Op.eq]: email,
      },
    },
  });
};

module.exports = {getUserByEmail};
