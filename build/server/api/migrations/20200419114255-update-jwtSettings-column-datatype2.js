"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.changeColumn("JWTExpirationSettings", "remembered", {
      type: Sequelize.DECIMAL
    });
  },
  down: function down(queryInterface, Sequelize) {}
};