"use strict";
module.exports = (sequelize, DataTypes) => {
  const JWTExpirationSetting = sequelize.define(
    "JWTExpirationSetting",
    {
      default: DataTypes.INTEGER, //in Hour (default: 0.5)
      remembered: DataTypes.INTEGER, // in Day (default: 7)
    },
    {}
  );
  JWTExpirationSetting.associate = function (models) {
    // associations can be defined here
  };
  return JWTExpirationSetting;
};
