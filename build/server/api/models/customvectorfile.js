'use strict';

module.exports = function (sequelize, DataTypes) {
  var CustomVectorFile = sequelize.define('CustomVectorFile', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    fileName: DataTypes.STRING
  }, {});

  CustomVectorFile.associate = function (models) {// associations can be defined here
  };

  return CustomVectorFile;
};