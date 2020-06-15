'use strict';
module.exports = (sequelize, DataTypes) => {
  const CustomVectorFile = sequelize.define('CustomVectorFile', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    fileName: DataTypes.STRING
  }, {});
  CustomVectorFile.associate = function(models) {
    // associations can be defined here
  };
  return CustomVectorFile;
};