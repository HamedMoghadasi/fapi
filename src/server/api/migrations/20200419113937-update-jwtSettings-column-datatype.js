"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("JWTExpirationSettings", "default", {
      type: Sequelize.DECIMAL,
    });
  },

  down: (queryInterface, Sequelize) => {},
};
