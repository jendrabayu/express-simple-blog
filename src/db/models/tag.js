'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      this.belongsToMany(models.Post, {
        through: 'tag_post',
        as: 'posts',
        timestamps: false,
      });
    }
  }
  Tag.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Tag',
      underscored: true,
    }
  );

  return Tag;
};
