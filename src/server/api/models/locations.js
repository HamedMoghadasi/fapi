"use strict";
module.exports = (sequelize, DataTypes) => {
  const Locations = sequelize.define(
    "Locations",
    {
      Name: DataTypes.STRING,
      KeyWords: DataTypes.STRING,
      lat: DataTypes.STRING,
      lon: DataTypes.STRING,
    },
    {}
  );
  Locations.associate = function (models) {
    // associations can be defined here
  };
  return Locations;
};