'use strict';
module.exports = (sequelize, DataTypes) => {
  const BaseMapServer = sequelize.define('BaseMapServer', {
    url: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    imageName: DataTypes.STRING
  }, {});
  BaseMapServer.associate = function(models) {
    // associations can be defined here
  };
  return BaseMapServer;
};