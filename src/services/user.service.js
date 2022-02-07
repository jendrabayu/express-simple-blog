const {User} = require('../db/models');
const {Op} = require('sequelize');

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
