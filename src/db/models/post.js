'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });

      this.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category',
      });

      this.belongsToMany(models.Tag, {
        through: 'tag_post',
        as: 'tags',
        timestamps: false,
      });
    }
  }
  Post.init(
    {
      user_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      image_path: DataTypes.STRING,
      body: DataTypes.TEXT,
      is_published: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Post',
      underscored: true,
    }
  );
  return Post;
};
