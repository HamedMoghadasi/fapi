"use strict";

module.exports = function (sequelize, DataTypes) {
  var BaseMapServer = sequelize.define("BaseMapServer", {
    url: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    imageName: DataTypes.STRING,
    maxZoom: DataTypes.STRING
  }, {});

  BaseMapServer.associate = function (models) {// associations can be defined here
  };

  return BaseMapServer;
};