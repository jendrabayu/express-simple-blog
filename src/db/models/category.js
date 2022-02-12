'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.hasMany(models.Post, {
        as: 'posts',
        foreignKey: 'category_id',
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Category',
      underscored: true,
    }
  );
  return Category;
};
