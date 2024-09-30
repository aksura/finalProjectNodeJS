'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie.init({
    title: DataTypes.STRING,
    synopsis: DataTypes.STRING,
    trailerUrl: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });

  
  Movie.associate = (models) => {
    Movie.hasMany(models.Bookmark, { foreignKey: 'movieId' });
  };
  

  return Movie;
};