'use strict';
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const {
  Model
} = require('sequelize');
const { PassThrough } = require("supertest/lib/test");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    generateToken() {
      const { id, email } = this;
      const token = sign({ id, email }, process.env.JWT_SECRET);
      return token;
    }

    verify(password) {
      return compareSync(password, this.password);
    }
  }
  User.init({
    name: DataTypes.STRING,
    username: {
      type : DataTypes.STRING,
      unique : true
    },
    email: {
      type : DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {
    const salt = genSaltSync(10);
    user.password = hashSync(user.password, salt);
  });

  
  User.associate = (models) => {
    User.hasMany(models.Bookmark, { foreignKey: 'userId' });
  };
  
  return User;
  
};