"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.changeColumn("JWTExpirationSettings", "default", {
      type: Sequelize.DECIMAL
    });
  },
  down: function down(queryInterface, Sequelize) {}
};