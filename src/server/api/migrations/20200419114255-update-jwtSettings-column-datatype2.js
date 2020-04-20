"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("JWTExpirationSettings", "remembered", {
      type: Sequelize.DECIMAL,
    });
  },

  down: (queryInterface, Sequelize) => {},
};
