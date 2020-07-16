'use strict';
module.exports = (sequelize, DataTypes) => {
  const heatMapServer = sequelize.define('heatMapServer', {
    key: DataTypes.STRING,
    parameter: DataTypes.STRING,
    location: DataTypes.STRING,
    satellite: DataTypes.STRING,
    timespan: DataTypes.STRING
  }, {});
  heatMapServer.associate = function(models) {
    // associations can be defined here
  };
  return heatMapServer;
};