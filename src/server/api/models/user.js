"use strict";
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      confirmationCode: DataTypes.UUID,
      isEmailConfirmed: DataTypes.BOOLEAN,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };

  User.beforeCreate((user, options) => {
    return bcrypt
      .hash(user.password, 15)
      .then((hash) => {
        user.password = hash;
      })
      .catch((err) => {
        throw new Error();
      });
  });
  return User;
};
