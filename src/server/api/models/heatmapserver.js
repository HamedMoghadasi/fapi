'use strict';
module.exports = (sequelize, DataTypes) => {
  const HeatMapServer = sequelize.define('HeatMapServer', {
    key: DataTypes.STRING,
    parameter: DataTypes.STRING,
    location: DataTypes.STRING,
    satellite: DataTypes.STRING,
    timespan: DataTypes.STRING
  }, {});
  HeatMapServer.associate = function(models) {
    // associations can be defined here
  };
  return HeatMapServer;
};