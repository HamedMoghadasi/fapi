"use strict";

module.exports = function (sequelize, DataTypes) {
  var UserActivityLog = sequelize.define("UserActivityLog", {
    action: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});

  UserActivityLog.associate = function (models) {// associations can be defined here
  };

  return UserActivityLog;
};