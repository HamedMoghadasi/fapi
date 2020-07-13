"use strict";

var bcrypt = require("bcrypt");

var uuid = require("uuid/v4");

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    confirmationCode: DataTypes.UUID,
    isEmailConfirmed: DataTypes.BOOLEAN,
    role: DataTypes.STRING,
    state: DataTypes.STRING
  }, {});

  User.associate = function (models) {// associations can be defined here
  };

  User.beforeCreate(function (user, options) {
    return bcrypt.hash(user.password, 15).then(function (hash) {
      user.password = hash;
      user.confirmationCode = uuid();
    })["catch"](function (err) {
      throw new Error();
    });
  });
  return User;
};